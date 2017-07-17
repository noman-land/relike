import { Map } from 'immutable';

import { ReLikeActionTypes } from 'relike-utils';

export default function pendingLikes(state = Map(), action) {
  switch (action.type) {
    case ReLikeActionTypes.DISLIKE_START:
      return state.setIn([action.payload.entityId, 'dislike'], true);

    case ReLikeActionTypes.LIKE_START:
      return state.setIn([action.payload.entityId, 'like'], true);

    case ReLikeActionTypes.UNDISLIKE_START:
      return state.setIn([action.payload.entityId, 'unDislike'], true);

    case ReLikeActionTypes.UNLIKE_START:
      return state.setIn([action.payload.entityId, 'unLike'], true);

    case ReLikeActionTypes.DISLIKE_ERROR:
    case ReLikeActionTypes.DISLIKE_SUCCESS:
      return state.setIn([action.meta.entityId, 'dislike'], false);

    case ReLikeActionTypes.LIKE_ERROR:
    case ReLikeActionTypes.LIKE_SUCCESS:
      return state.setIn([action.meta.entityId, 'like'], false);

    case ReLikeActionTypes.UNDISLIKE_ERROR:
    case ReLikeActionTypes.UNDISLIKE_SUCCESS:
      return state.setIn([action.meta.entityId, 'unDislike'], false);

    case ReLikeActionTypes.UNLIKE_ERROR:
    case ReLikeActionTypes.UNLIKE_SUCCESS:
      return state.setIn([action.meta.entityId, 'unLike'], false);

    default:
      return state;
  }
}
