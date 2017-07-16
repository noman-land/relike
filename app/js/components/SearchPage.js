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
      searchResult: PropTypes.shape({
        dislikes: PropTypes.number.isRequired,
        entityId: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
      }).isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeAccount: null,
      myRating: 0,
      pendingLikes: Map(),
      searchInput: '',
    };

    this.fetchDataAndUpdateCard = this.fetchDataAndUpdateCard.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAccountSwitch = this.onAccountSwitch.bind(this);
    this.onLikeEvent = this.onLikeEvent.bind(this);
    this.updateMyRating = this.updateMyRating.bind(this);

    // init ReLike
    this.reLikeUtils = new ReLikeUtils({
      onAccountSwitch: this.onAccountSwitch,
      onLikeEvent: this.onLikeEvent,
    });
  }

  componentDidMount() {
    const { getLikeCount, searchResult: { entityId } } = this.props;
    getLikeCount(entityId);
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
    this.fetchDataAndUpdateCard(this.props.searchResult.entityId);
  }

  onLikeEvent(entityId) {
    const { pendingLikes } = this.state;
    const { searchResult: { entityId: currentEntityId } } = this.props;
    this.setState({ pendingLikes: pendingLikes.delete(entityId) });
    if (entityId === currentEntityId) {
      this.fetchDataAndUpdateCard(entityId);
    }
  }

  fetchDataAndUpdateCard(entityId) {
    this.reLikeUtils.getLikeCount(entityId).then(this.updateLikeCount);
    this.reLikeUtils.getMyRating(entityId).then(this.updateMyRating);
  }

  handleInputChange({ target: { value } }) {
    this.setState({
      searchInput: value,
    });
  }

  handleDislikeClick() {
    const { myRating, pendingLikes } = this.state;
    const { searchResult: { entityId } } = this.props;

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
    const { myRating, pendingLikes } = this.state;
    const { searchResult: { entityId } } = this.props;

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
    this.props.getLikeCount(this.state.searchInput);
  }

  updateMyRating(myRating) {
    this.setState({ myRating });
  }

  render() {
    const {
      myRating,
      searchInput,
    } = this.state;

    const { searchResult: { dislikes, entityId, likes } } = this.props;

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
