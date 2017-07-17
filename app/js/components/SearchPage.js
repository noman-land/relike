import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import LikeCard from '../components/LikeCard';
import SearchBar from '../components/SearchBar';

import { doesDislike, doesLike } from '../utils/likingUtils';

export default class SearchPage extends Component {
  static get propTypes() {
    return {
      dislike: PropTypes.func.isRequired,
      getLikeData: PropTypes.func.isRequired,
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

  isDislikePending() {
    const { pendingLikes, searchResult: { entityId } } = this.props;

    return !!(pendingLikes.getIn([entityId, 'dislike'])
    || pendingLikes.getIn([entityId, 'unDislike']));
  }

  isLikePending() {
    const { pendingLikes, searchResult: { entityId } } = this.props;

    return !!(pendingLikes.getIn([entityId, 'like'])
    || pendingLikes.getIn([entityId, 'unLike']));
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
    const { searchResult: { dislikes, entityId, likes, myRating } } = this.props;

    return (
      <div>
        <SearchBar
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          searchInput={searchInput}
        />
        {entityId && (
          <LikeCard
            dislikes={dislikes}
            entityId={entityId}
            isDislikePending={this.isDislikePending()}
            isLikePending={this.isLikePending()}
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
