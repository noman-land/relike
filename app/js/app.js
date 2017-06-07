import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Web3 from 'web3';
import contract from 'truffle-contract';

import '../css/app.css';

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
      entityId: props.entityId,
      likeCount: 0,
    };

    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this);
    this.getMyRating = this.getMyRating.bind(this);
    this.updateButtonLikeCount = this.updateButtonLikeCount.bind(this);
    this.updateButtonStyle = this.updateButtonStyle.bind(this);

    this.updateButtonOnAccountSwitch();
    this.updateButtonOnLikeEvents();
  }

  dislike() {
    return this.ReLikeContract.deployed().then(instance => (
      instance.dislike(this.entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** ALREADY DISLIKED **'))
    ));
  }

  getActiveAccount() {
    return this.web3.eth.accounts[0];
  }

  getLikeCount() {
    return this.ReLikeContract.deployed().then(instance => (
      instance.getEntity.call(this.entityId).then(([likes, dislikes]) => ({
        dislikes: dislikes.toNumber(),
        likes: likes.toNumber(),
      }))
    ));
  }

  getMyRating() {
    return this.ReLikeContract.deployed().then(instance => {
      return instance.getLikeById
      .call(this.entityId, { from: this.getActiveAccount() })
      .then(([rating]) => rating.toNumber());
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

  like() {
    return this.ReLikeContract.deployed().then(instance => {
      return instance.like(this.entityId, { from: this.getActiveAccount(), gas: 2000000 })
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

  unDislike() {
    return this.ReLikeContract.deployed().then(instance => (
      instance.unDislike(this.entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** NEVER DISLIKED **'))
    ));
  }

  unLike() {
    return this.ReLikeContract.deployed().then(instance => (
      instance.unLike(this.entityId, { from: this.getActiveAccount(), gas: 2000000 })
        .catch(() => console.log('** NEVER LIKED **'))
    ));
  }

  updateButtonLikeCount({ likes }) {
    this.likeCount.innerText = likes;
  }

  updateButtonStyle(myRating) {
    if (Ratings[myRating] === RatingTypes.LIKE) {
      this.button.classList.add('liked');
    } else {
      this.button.classList.remove('liked');
    }
  }

  render() {
    return (
      <div>hello</div>
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
  const baseName = 'relike--universal-like-button';
  const interval = setInterval(() => {
    const scriptNode = document.getElementById(`${baseName}--entrypoint`);
    if (scriptNode === null) return false;

    const { parentNode } = scriptNode;
    const entityId = scriptNode.getAttribute('data-relike-id');

    const appContainer = document.createElement('div');

    appContainer.id = 'relike-application';
    parentNode.removeChild(scriptNode);
    parentNode.appendChild(appContainer);
    clearInterval(interval);

    ReactDOM.render(
      <ReLike entityId={entityId} />,
      document.getElementById('relike-application'),
    );
  }, 100);
};

ReLike.init();
