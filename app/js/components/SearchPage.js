import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReLikeUtils from 'relike-utils';
import { Map } from 'immutable';

import LikeCard from '../components/LikeCard';
import SearchBar from '../components/SearchBar';

import { doesDislike, doesLike } from '../utils/likingUtils';

export default class SearchPage extends Component {
  static get propTypes() {
    return {
      accountLoading: PropTypes.bool.isRequired,
      getLikeCount: PropTypes.func.isRequired,
      getMyRating: PropTypes.func.isRequired,
      searchResult: PropTypes.shape({
        dislikes: PropTypes.number.isRequired,
        entityId: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        myRating: PropTypes.number.isRequired,
      }).isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeAccount: null,
      pendingLikes: Map(),
      searchInput: '',
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAccountSwitch = this.onAccountSwitch.bind(this);
    this.onLikeEvent = this.onLikeEvent.bind(this);

    // init ReLike
    this.reLikeUtils = new ReLikeUtils({
      onAccountSwitch: this.onAccountSwitch,
      onLikeEvent: this.onLikeEvent,
    });
  }

  componentDidMount() {
    this.fetchData(this.props.searchResult.entityId);
  }

  isDislikePending() {
    const { pendingLikes } = this.state;
    const { searchResult: { entityId } } = this.props;

    return !!(pendingLikes.getIn([entityId, 'dislike'])
    || pendingLikes.getIn([entityId, 'unDislike']));
  }

  isLikePending() {
    const { pendingLikes } = this.state;
    const { searchResult: { entityId } } = this.props;

    return !!(pendingLikes.getIn([entityId, 'like'])
    || pendingLikes.getIn([entityId, 'unLike']));
  }

  onAccountSwitch(activeAccount) {
    this.setState({ activeAccount });
    this.fetchData(this.props.searchResult.entityId);
  }

  onLikeEvent(entityId) {
    const { pendingLikes } = this.state;
    const { searchResult: { entityId: currentEntityId } } = this.props;
    this.setState({ pendingLikes: pendingLikes.delete(entityId) });
    if (entityId === currentEntityId) {
      this.fetchData(entityId);
    }
  }

  fetchData(entityId) {
    const { getLikeCount, getMyRating } = this.props;

    getLikeCount(entityId);
    getMyRating(entityId);
  }

  handleInputChange({ target: { value } }) {
    this.setState({
      searchInput: value,
    });
  }

  handleDislikeClick() {
    const { pendingLikes } = this.state;
    const { searchResult: { entityId, myRating } } = this.props;

    if (doesDislike(myRating)) {
      this.setState({
        pendingLikes: pendingLikes.setIn([entityId, 'unDislike'], true),
      });
      this.reLikeUtils.unDislike(entityId);
    } else {
      this.setState({
        pendingLikes: pendingLikes.setIn([entityId, 'dislike'], true),
      });
      this.reLikeUtils.dislike(entityId);
    }
  }

  handleLikeClick() {
    const { pendingLikes } = this.state;
    const { searchResult: { entityId, myRating } } = this.props;

    if (doesLike(myRating)) {
      this.setState({
        pendingLikes: pendingLikes.setIn([entityId, 'unLike'], true),
      });
      this.reLikeUtils.unLike(entityId);
    } else {
      this.setState({
        pendingLikes: pendingLikes.setIn([entityId, 'like'], true),
      });
      this.reLikeUtils.like(entityId);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchData(this.state.searchInput);
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
