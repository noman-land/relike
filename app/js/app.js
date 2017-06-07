import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Web3 from 'web3';
import contract from 'truffle-contract';

import '../sass/style.sass';

import relikeArtifacts from '../../build/contracts/ReLike.json';

import { Ratings, RatingTypes } from './constants';

class ReLike extends Component {
  constructor(props, context) {
    super(props, context);

    this.ReLikeContract = contract(relikeArtifacts);
    this.web3 = null;

    this.initWeb3();
    this.ReLikeContract.setProvider(this.web3.currentProvider);

    window[`ReLike_${Math.random().toString().slice(2)}`] = this;

    this.state = {
      results: [1, 2, 3, 4],
      searchInput: '',
    };

    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this);
    this.getMyRating = this.getMyRating.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.updateButtonOnAccountSwitch();
    this.updateButtonOnLikeEvents();
  }

  dislike(entityId) {
    return this.ReLikeContract.deployed().then(instance => (
      instance.dislike(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** ALREADY DISLIKED **'))
    ));
  }

  getActiveAccount() {
    return this.web3.eth.accounts[0];
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

  initWeb3() {
    if (typeof window.web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      // this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
    window.web3 = this.web3;
  }

  like(entityId) {
    return this.ReLikeContract.deployed().then(instance => {
      return instance.like(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** ALREADY LIKED **'));
    });
  }

  updateButtonOnAccountSwitch() {
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

  updateButtonOnLikeEvents() {
    return this.ReLikeContract.deployed().then(instance => instance.ItemLiked(() => {
      this.getLikeCount().then(this.updateButtonLikeCount);
      this.getMyRating().then(this.updateButtonStyle);
    }));
  }

  unDislike(entityId) {
    return this.ReLikeContract.deployed().then(instance => (
      instance.unDislike(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** NEVER DISLIKED **'))
    ));
  }

  unLike(entityId) {
    return this.ReLikeContract.deployed().then(instance => (
      instance.unLike(entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** NEVER LIKED **'))
    ));
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
    return (
      <div className="flex-column">
        <h2 className="m-4 text-center">
          Like anything
        </h2>
        <div className="flex-column p-4">
          <input
            className={inputClassNames}
            onChange={this.handleInputChange}
            value={this.state.searchInput}
          />
          <ul className="flex-column p-0 border-solid border-1 border-grey-lt">
            {this.state.results.map(value => (
              <li key={value} className="result">
                {`thing ${value}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReLike.propTypes = {
  entityId: PropTypes.string,
};

ReLike.defaultProps = {
  entityId: null,
};

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
