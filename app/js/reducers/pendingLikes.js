import { List, Map } from 'immutable';

import { ReLikeActions, ReLikeActionTypes } from 'relike-utils';

const {
  dislikeActions: { dislikeSuccess },
  likeActions: { likeSuccess },
  unDislikeActions: { unDislikeSuccess },
  unLikeActions: { unLikeSuccess },
} = ReLikeActions;

export default function pendingLikes(state = Map(), action) {
  switch (action.type) {
    case ReLikeActionTypes.DISLIKE_START: {
      const { entityId, timestamp } = action.payload;
      return state.update(entityId, (pendingActions = List()) => {
        return pendingActions.push(dislikeSuccess(null, entityId, timestamp));
      });
    }
    case ReLikeActionTypes.LIKE_START: {
      const { entityId, timestamp } = action.payload;
      return state.update(entityId, (pendingActions = List()) => {
        return pendingActions.push(likeSuccess(null, entityId, timestamp));
      });
    }
    case ReLikeActionTypes.UNDISLIKE_START: {
      const { entityId, timestamp } = action.payload;
      return state.update(entityId, (pendingActions = List()) => {
        return pendingActions.push(unDislikeSuccess(null, entityId, timestamp));
      });
    }
    case ReLikeActionTypes.UNLIKE_START: {
      const { entityId, timestamp } = action.payload;
      return state.update(entityId, (pendingActions = List()) => {
        return pendingActions.push(unLikeSuccess(null, entityId, timestamp));
      });
    }

    case ReLikeActionTypes.DISLIKE_ERROR:
    case ReLikeActionTypes.DISLIKE_SUCCESS:
    case ReLikeActionTypes.LIKE_ERROR:
    case ReLikeActionTypes.LIKE_SUCCESS:
    case ReLikeActionTypes.UNDISLIKE_ERROR:
    case ReLikeActionTypes.UNDISLIKE_SUCCESS:
    case ReLikeActionTypes.UNLIKE_ERROR:
    case ReLikeActionTypes.UNLIKE_SUCCESS: {
      const { entityId, timestamp } = action.meta;
      const updatedState = state.update(entityId, (pendingActions = List()) => {
        return pendingActions.filter(pendingAction => {
          const { meta: { timestamp: timestampOfPending } } = pendingAction;
          return timestamp !== timestampOfPending;
        });
      });
      return updatedState.get(entityId).size
        ? updatedState
        : updatedState.delete(entityId);
    }

    default:
      return state;
  }
}
