
import classnames from 'classnames';
import contract from 'truffle-contract';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Q from 'q';
import Web3 from 'web3';

import '../sass/style.sass';

import relikeArtifacts from '../../build/contracts/ReLike.json';

import { Ratings, RatingTypes } from './constants';

class ReLike extends Component {
  constructor(props, context) {
    super(props, context);

    this.web3 = null;
    this.initWeb3();

    this.ReLikeContract = contract(relikeArtifacts);
    this.ReLikeContract.setProvider(this.web3.currentProvider);

    window[`ReLike_${Math.random().toString().slice(2)}`] = this;

    this.state = {
      accountLoading: true,
      myRating: 0,
      result: {
        dislikes: 0,
        entityId: 'ReLike',
        likes: 0,
      },
      searchInput: '',
    };

    this.dislike = this.dislike.bind(this);
    this.getMyRating = this.getMyRating.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.like = this.like.bind(this);

    this.updateOnAccountSwitch();
    this.updateOnLikeEvents();
  }

  dislike(entityId) {
    console.log('Disliking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return instance.dislike(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(error => console.error('Disliking failed:', error));
    });
  }

  doesDislike(myRating) {
    return Ratings[myRating] === RatingTypes.DISLIKE;
  }

  doesLike(myRating) {
    return Ratings[myRating] === RatingTypes.LIKE;
  }

  getActiveAccount() {
    const activeAccount = this.web3.eth.accounts[0];

    if (!activeAccount) {
      this.setState({ accountLoading: true });
    } else {
      this.setState({ accountLoading: false });
    }

    return activeAccount;
  }

  getLikeCount(entityId) {
    return this.ReLikeContract.deployed().then(instance => (
      instance.getEntity.call(entityId).then(([likes, dislikes]) => ({
        dislikes: dislikes.toNumber(),
        likes: likes.toNumber(),
      }))
    ));
  }

  getMyRating(entityId) {
    return this.ReLikeContract.deployed().then(instance => {
      return instance.getLikeById
      .call(entityId, { from: this.getActiveAccount() })
      .then(([rating]) => rating.toNumber());
    });
  }

  handleInputChange({ target: { value } }) {
    this.setState({
      searchInput: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { searchInput } = this.state;

    Q.all([
      this.getMyRating(searchInput),
      this.getLikeCount(searchInput),
    ]).spread((myRating, likeCount) => {
      this.setState({
        result: { ...likeCount, entityId: searchInput },
        myRating,
      });
    });
  }

  initWeb3(fallback) {
    if (typeof window.web3 !== 'undefined') {
      console.warn('Using web3 detected from external source.');
      this.web3 = new Web3(window.web3.currentProvider);
    } else if (typeof fallback === 'function') {
      fallback();
    }
    window.web3 = this.web3;
  }

  like(entityId) {
    return this.ReLikeContract.deployed().then(instance => {
      return instance.like(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** ALREADY LIKED **'));
    });
  }

  updateOnAccountSwitch() {
    let lastActiveAccount = null;
    let activeAccount = null;

    setInterval(() => {
      activeAccount = this.getActiveAccount();
      if (activeAccount === lastActiveAccount) {
        return;
      }

      lastActiveAccount = activeAccount;
      this.getLikeCount().then(this.updateButtonLikeCount);
      this.getMyRating().then(this.updateButtonStyle);
    }, 500);
  }

  updateOnLikeEvents() {
    return this.ReLikeContract.deployed().then(instance => instance.ItemLiked(() => {
      this.getLikeCount().then(this.updateButtonLikeCount);
      this.getMyRating().then(this.updateButtonStyle);
    }));
  }

  unDislike(entityId) {
    console.info('Undisliking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return instance.unDislike(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(error => console.error('Undisliking failed:', error));
    });
  }

  unLike(entityId) {
    console.info('Unliking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return instance.unLike(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(error => console.error('Unliking failed:', error));
    });
  }

  render() {
    const inputClassNames = classnames([
      'border-1',
      'border-grey-lt',
      'border-radius-2',
      'border-solid',
      'outline-none',
      'p-4',
      'text-size-8',
    ]);

    const { myRating, result: { dislikes, entityId, likes }, searchInput } = this.state;

    return (
      <div className="flex-column">
        <h2 className="m-4 text-center">
          Like anything
        </h2>
        <div className="flex-column p-4">
          <form className="flex-column" onSubmit={this.handleSubmit}>
            <input
              className={inputClassNames}
              onChange={this.handleInputChange}
              value={searchInput}
            />
          </form>
          <ul className="flex-column p-0 border-solid border-1 border-grey-lt">
            <li key={entityId} className="result">
              <span>
                {entityId}
              </span>
              <div>
                <span
                  className={classnames([
                    { 'bg-blue-lt': this.doesLike(myRating) },
                    'border-1',
                    'border-solid',
                    'border-blue',
                    'p-2',
                  ])}
                >
                  {likes}
                </span>
                <span
                  className={classnames([
                    { 'bg-blue-lt': this.doesDislike(myRating) },
                    'border-1',
                    'border-solid',
                    'border-blue',
                    'm-2-l',
                    'p-2',
                  ])}
                >
                  {dislikes}
                </span>
              </div>
            </li>
          </ul>
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
