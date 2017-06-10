import contract from 'truffle-contract';
import Q from 'q';
import Web3 from 'web3';

import relikeArtifacts from '../../../build/contracts/ReLike.json';

import { logError } from '../utils/loggingUtils';

export default class ReLikeUtils {
  constructor({ onAccountSwitch, onLikeEvent, web3Override }) {
    if (typeof web3Override === 'function') {
      this.web3 = web3Override(this.web3);
    } else {
      this.initWeb3();
    }

    this.ReLikeContract = contract(relikeArtifacts);
    this.ReLikeContract.setProvider(this.web3.currentProvider);

    this.updateOnAccountSwitch(onAccountSwitch);
    this.updateOnLikeEvents(onLikeEvent);
  }

  dislike(entityId) {
    console.log('Disliking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.dislike(entityId, { from: activeAccount, gas: 2000000 })
        .catch(logError('Failed to dislike'));
      });
    });
  }

  getActiveAccount() {
    const deferred = Q.defer();

    this.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        logError('Failed to get activeAccount')(error);
        deferred.reject(error);
        return false;
      }

      deferred.resolve(accounts[0]);
      return true;
    });

    return deferred.promise;
  }

  getLikeCount(entityId) {
    return this.ReLikeContract.deployed().then(instance => (
      instance.getEntity.call(entityId).then(([likes, dislikes]) => ({
        dislikes: dislikes.toNumber(),
        likes: likes.toNumber(),
      })).catch(logError('Failed to get likeCount'))
    ));
  }

  getMyRating(entityId) {
    return this.ReLikeContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.getLikeById
        .call(entityId, { from: activeAccount })
        .then(([rating]) => rating.toNumber())
        .catch(logError('Failed to get myRating'));
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
    console.info('Liking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.like(entityId, { from: activeAccount, gas: 2000000 })
        .catch(logError('Failed to like'));
      });
    });
  }

  unDislike(entityId) {
    console.info('Undisliking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.unDislike(entityId, { from: activeAccount, gas: 2000000 })
        .catch(logError('Failed to undislike'));
      });
    });
  }

  unLike(entityId) {
    console.info('Unliking', entityId);
    return this.ReLikeContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.unLike(entityId, { from: activeAccount, gas: 2000000 })
        .catch(logError('Failed to unlike'));
      });
    });
  }

  updateOnAccountSwitch(callback) {
    let oldAccount = null;
    setInterval(() => this.getActiveAccount().then(newAccount => {
      console.log('********', newAccount);
      if (oldAccount === newAccount) {
        return false;
      }
      console.info('Account switched to', newAccount);
      oldAccount = newAccount;

      if (typeof callback === 'function') {
        callback(newAccount);
      }
    }), 500);
  }

  updateOnLikeEvents(callback) {
    this.ReLikeContract.deployed().then(instance => instance.ItemLiked((error, result) => {
      const { args: { entityId } } = result;
      console.info('Saw a like event for:', entityId);
      callback(entityId);
    }));
  }
}
