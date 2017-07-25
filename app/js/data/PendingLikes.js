import { List, Map, Record } from 'immutable';

import { ReLikeActions, ReLikeActionTypes } from 'relike-utils';

const {
  dislikeActions: { dislikeSuccess },
  likeActions: { likeSuccess },
  unDislikeActions: { unDislikeSuccess },
  unLikeActions: { unLikeSuccess },
} = ReLikeActions;

export default class PendingLikes extends Record({
  pendingActions: Map(),
}) {
  addPendingDislikeAction({ entityId, timestamp }) {
    return this.updateIn(['pendingActions', entityId], List(), pendingActions => {
      return pendingActions.push(dislikeSuccess(null, entityId, timestamp));
    });
  }

  addPendingLikeAction({ entityId, timestamp }) {
    return this.updateIn(['pendingActions', entityId], List(), pendingActions => {
      return pendingActions.push(likeSuccess(null, entityId, timestamp));
    });
  }

  addPendingUnDislikeAction({ entityId, timestamp }) {
    return this.updateIn(['pendingActions', entityId], List(), pendingActions => {
      return pendingActions.push(unDislikeSuccess(null, entityId, timestamp));
    });
  }

  addPendingUnLikeAction({ entityId, timestamp }) {
    return this.updateIn(['pendingActions', entityId], List(), pendingActions => {
      return pendingActions.push(unLikeSuccess(null, entityId, timestamp));
    });
  }

  isPending(entityId, actionType) {
    const pendingLikesForEntity = this.pendingActions.get(entityId);

    if (!pendingLikesForEntity) {
      return false;
    }

    return pendingLikesForEntity.some(action => action.type === actionType);
  }

  isDislikePending(entityId) {
    return this.isPending(entityId, ReLikeActionTypes.DISLIKE_SUCCESS);
  }

  isLikePending(entityId) {
    return this.isPending(entityId, ReLikeActionTypes.LIKE_SUCCESS);
  }

  isUnDislikePending(entityId) {
    return this.isPending(entityId, ReLikeActionTypes.UNDISLIKE_SUCCESS);
  }

  isUnLikePending(entityId) {
    return this.isPending(entityId, ReLikeActionTypes.UNLIKE_SUCCESS);
  }

  removePendingAction({ entityId, timestamp }) {
    const updatedState = this.updateIn(['pendingActions', entityId], List(), pendingActions => {
      return pendingActions.filter(pendingAction => {
        const { meta: { timestamp: timestampOfPending } } = pendingAction;
        return timestamp !== timestampOfPending;
      });
    });

    return updatedState.getIn(['pendingActions', entityId]).size
      ? updatedState
      : updatedState.deleteIn(['pendingActions', entityId]);
  }
}
