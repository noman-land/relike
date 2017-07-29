import { ReLikeActionTypes } from 'relike-redux-middleware';

import PendingLikes from '../data/PendingLikes';

export default function pendingLikes(state = new PendingLikes(), action) {
  switch (action.type) {
    case ReLikeActionTypes.DISLIKE_START:
      return state.addPendingDislikeAction(action.payload);

    case ReLikeActionTypes.LIKE_START:
      return state.addPendingLikeAction(action.payload);

    case ReLikeActionTypes.UNDISLIKE_START:
      return state.addPendingUnDislikeAction(action.payload);

    case ReLikeActionTypes.UNLIKE_START:
      return state.addPendingUnLikeAction(action.payload);

    case ReLikeActionTypes.DISLIKE_ERROR:
    case ReLikeActionTypes.DISLIKE_SUCCESS:
    case ReLikeActionTypes.LIKE_ERROR:
    case ReLikeActionTypes.LIKE_SUCCESS:
    case ReLikeActionTypes.UNDISLIKE_ERROR:
    case ReLikeActionTypes.UNDISLIKE_SUCCESS:
    case ReLikeActionTypes.UNLIKE_ERROR:
    case ReLikeActionTypes.UNLIKE_SUCCESS: {
      return state.removePendingAction(action.meta);
    }

    default:
      return state;
  }
}
