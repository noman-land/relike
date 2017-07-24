import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ReLikeActionTypes } from 'relike-utils';

import LikeCard from '../components/LikeCard';
import SearchBar from '../components/SearchBar';

import { doesDislike, doesLike } from '../utils/likingUtils';

export default class SearchPage extends Component {
  static get propTypes() {
    return {
      activeAccount: PropTypes.string,
      dislike: PropTypes.func.isRequired,
      getLikeData: PropTypes.func.isRequired,
      getMyRating: PropTypes.func.isRequired,
      like: PropTypes.func.isRequired,
      pendingLikes: ImmutablePropTypes.map.isRequired,
      searchResult: PropTypes.shape({
        dislikes: PropTypes.number.isRequired,
        entityId: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        myRating: PropTypes.number.isRequired,
      }).isRequired,
      unDislike: PropTypes.func.isRequired,
      unLike: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      activeAccount: null,
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchInput: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getLikeData, searchResult: { entityId } } = this.props;
    getLikeData(entityId);
  }

  componentWillReceiveProps(newProps) {
    const { activeAccount, getMyRating, searchResult: { entityId } } = this.props;
    if (newProps.activeAccount !== activeAccount) {
      getMyRating(entityId);
    }
  }

  isPending(actionType) {
    const { pendingLikes, searchResult: { entityId } } = this.props;
    const pendingLikesForEntity = pendingLikes.get(entityId);

    if (!pendingLikesForEntity) {
      return false;
    }

    return pendingLikesForEntity.some(action => action.type === actionType);
  }

  handleInputChange({ target: { value } }) {
    this.setState({
      searchInput: value,
    });
  }

  handleDislikeClick() {
    const {
      dislike,
      searchResult: { entityId, myRating },
      unDislike,
    } = this.props;

    if (doesDislike(myRating)) {
      unDislike(entityId);
    } else {
      dislike(entityId);
    }
  }

  handleLikeClick() {
    const {
      like,
      searchResult: { entityId, myRating },
      unLike,
    } = this.props;

    if (doesLike(myRating)) {
      unLike(entityId);
    } else {
      like(entityId);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getLikeData(this.state.searchInput);
  }

  render() {
    const { searchInput } = this.state;
    const {
      activeAccount,
      searchResult: { dislikes, entityId, likes, myRating },
    } = this.props;

    const {
      DISLIKE_SUCCESS,
      LIKE_SUCCESS,
      UNDISLIKE_SUCCESS,
      UNLIKE_SUCCESS,
    } = ReLikeActionTypes;

    return (
      <div>
        <SearchBar
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          searchInput={searchInput}
        />
        {entityId && (
          <LikeCard
            disabled={!activeAccount}
            dislikes={dislikes}
            entityId={entityId}
            isDislikePending={this.isPending(DISLIKE_SUCCESS)}
            isLikePending={this.isPending(LIKE_SUCCESS)}
            isUnDislikePending={this.isPending(UNDISLIKE_SUCCESS)}
            isUnLikePending={this.isPending(UNLIKE_SUCCESS)}
            likes={likes}
            myRating={myRating}
            onDislikeClick={this.handleDislikeClick}
            onLikeClick={this.handleLikeClick}
          />
        )}
      </div>
    );
  }
}
