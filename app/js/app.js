import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../sass/style.sass';

import LikeCard from './components/LikeCard';
import SearchBar from './components/SearchBar';

import { doesDislike, doesLike } from './utils/likingUtils';
import ReLikeUtils from './utils/ReLikeUtils';

class ReLike extends Component {
  constructor(props, context) {
    super(props, context);

    window.ReLike = this;

    this.state = {
      accountLoading: true,
      activeAccount: null,
      myRating: 0,
      result: {
        dislikes: 0,
        entityId: 'ReLike',
        likes: 0,
      },
      searchInput: '',
    };

    this.fetchDataAndUpdateCard = this.fetchDataAndUpdateCard.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAccountSwitch = this.onAccountSwitch.bind(this);
    this.onLikeEvent = this.onLikeEvent.bind(this);
    this.updateLikeCount = this.updateLikeCount.bind(this);
    this.updateMyRating = this.updateMyRating.bind(this);

    this.reLikeUtils = new ReLikeUtils({
      onAccountSwitch: this.onAccountSwitch,
      onLikeEvent: this.onLikeEvent,
    });
  }

  onAccountSwitch(activeAccount) {
    this.setState({ activeAccount });
    this.fetchDataAndUpdateCard(this.state.result.entityId);
  }

  onLikeEvent() {
    this.fetchDataAndUpdateCard(this.state.result.entityId);
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

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      result: {
        ...this.state.result,
        entityId: this.state.searchInput,
      },
    });

    this.fetchDataAndUpdateCard(this.state.searchInput);
  }

  optimisticLike() {
    const {
      result: {
        likes: currentLikes,
        dislikes: currentDislikes,
      },
      myRating: currentMyRating,
    } = this.state;

    const newDislikes = doesDislike(currentMyRating)
      ? currentDislikes - 1
      : currentDislikes;

    this.setState({
      myRating: 1,
      result: {
        ...this.state.result,
        likes: currentLikes + 1,
        dislikes: newDislikes,
      },
    });
  }

  updateLikeCount({ dislikes, likes }) {
    console.info('Updating like count', likes, dislikes);
    this.setState({
      result: {
        ...this.state.result,
        dislikes,
        likes,
      },
    });
  }

  updateMyRating(myRating) {
    this.setState({ myRating });
  }

  render() {
    const { myRating, result: { dislikes, entityId, likes }, searchInput } = this.state;

    const handleLikeClick = doesLike(myRating)
      ? () => this.reLikeUtils.unLike(entityId)
      : () => this.reLikeUtils.like(entityId);

    const handleDislikeClick = doesDislike(myRating)
      ? () => this.reLikeUtils.unDislike(entityId)
      : () => this.reLikeUtils.dislike(entityId);

    return (
      <div className="flex-column">
        <h2 className="m-4 text-center">
          Like anything
        </h2>
        <div className="flex-column p-4-x p-4-b p-0-t">
          <SearchBar
            searchInput={searchInput}
            onInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit}
          />
          {entityId && (
            <LikeCard
              dislikes={dislikes}
              entityId={entityId}
              likes={likes}
              myRating={myRating}
              onDislikeClick={handleDislikeClick}
              onLikeClick={handleLikeClick}
            />
          )}
        </div>
      </div>
    );
  }
}

ReLike.init = () => {
  const interval = setInterval(() => {
    const appContainer = document.getElementById('relike-application');

    if (appContainer === null) return false;

    clearInterval(interval);
    ReactDOM.render(<ReLike />, appContainer);
    return true;
  }, 100);
};

ReLike.init();
