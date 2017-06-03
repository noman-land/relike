import Web3 from 'web3';
import contract from 'truffle-contract';
import Q from 'q';

import '../css/app.css';

import relikeArtifacts from '../../build/contracts/ReLike.json';

import { Ratings, RatingTypes } from './constants';

const defaultConfig = {};

class ReLike {
  constructor(entityId = null, { button, likeCount, likeText } = defaultConfig) {
    this.button = button;
    this.entityId = entityId;
    this.likeCount = likeCount;
    this.likeText = likeText;
    this.ReLikeContract = contract(relikeArtifacts);
    this.web3 = null;

    this.likeCount.innerText = 0;
    this.likeText.innerText = 'ReLike';

    this.initWeb3();
    this.ReLikeContract.setProvider(this.web3.currentProvider);

    window[`ReLike_${Math.random().toString().slice(2)}`] = this;

    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this);
    this.getMyRating = this.getMyRating.bind(this);
    this.updateButtonLikeCount = this.updateButtonLikeCount.bind(this);
    this.updateButtonStyle = this.updateButtonStyle.bind(this);

    this.updateButtonOnAccountSwitch();
    this.updateButtonOnLikeEvents();
    this.attachClickListener();
  }

  attachClickListener() {
    this.button.addEventListener('click', () => {
      this.getMyRating().then((myRating) => {
        if (Ratings[myRating] === RatingTypes.LIKE) {
          this.unLike();
        } else {
          this.like();
        }
      });
    });
  }

  dislike() {
    return this.ReLikeContract.deployed().then(instance => (
      this.getActiveAccount().then(address => (
        instance.dislike(this.entityId, { from: address, gas: 2000000 })
          .catch(() => console.log('** ALREADY DISLIKED **'))
      ))
    ));
  }

  getActiveAccount() {
    const deferred = Q.defer();
    this.web3.eth.getCoinbase((error, address) => {
      if (error) {
        deferred.reject(error);
      }
      deferred.resolve(address);
    });
    return deferred.promise;
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
    return this.ReLikeContract.deployed().then(instance => (
      this.getActiveAccount().then(address => (
        instance.getLikeById
          .call(this.entityId, { from: address })
          .then(([rating]) => rating.toNumber())
      ))
    ));
  }

  initWeb3() {
    if (typeof window.web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
    window.web3 = this.web3;
  }

  like() {
    return this.ReLikeContract.deployed().then(instance => (
      this.getActiveAccount().then(address => (
        instance.like(this.entityId, { from: address, gas: 2000000 })
          .catch(() => console.log('** ALREADY LIKED **'))
      ))
    ));
  }

  updateButtonOnAccountSwitch() {
    let lastActiveAccount = null;
    setInterval(() => {
      this.getActiveAccount().then((activeAccount) => {
        if (activeAccount === lastActiveAccount) {
          return;
        }

        lastActiveAccount = activeAccount;
        this.getLikeCount().then(this.updateButtonLikeCount);
        this.getMyRating().then(this.updateButtonStyle);
      });
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
      this.getActiveAccount().then(address => (
        instance.unDislike(this.entityId, { from: address, gas: 2000000 })
          .catch(() => console.log('** NEVER DISLIKED **'))
      ))
    ));
  }

  unLike() {
    return this.ReLikeContract.deployed().then(instance => (
      this.getActiveAccount().then(address => (
        instance.unLike(this.entityId, { from: address, gas: 2000000 })
          .catch(() => console.log('** NEVER LIKED **'))
      ))
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
}

ReLike.init = () => {
  const baseName = 'relike--universal-like-button';
  const interval = setInterval(() => {
    const scriptNode = document.getElementById(`${baseName}--entrypoint`);
    if (scriptNode === null) return false;

    const { parentNode } = scriptNode;
    const entityId = scriptNode.getAttribute('data-relike-id');

    const button = document.createElement('button');
    const likeCount = document.createElement('span');
    const likeText = document.createElement('span');

    button.id = baseName;
    likeCount.id = `${baseName}--like-count`;
    likeText.id = `${baseName}--like-text`;

    button.appendChild(likeText);
    button.appendChild(likeCount);

    parentNode.removeChild(scriptNode);
    parentNode.appendChild(button);
    clearInterval(interval);
    return new ReLike(entityId, { button, likeText, likeCount });
  }, 500);
};

ReLike.init();
