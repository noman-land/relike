import { ReLikeActionTypes } from 'relike-utils';

import { Ratings, RatingTypes } from '../constants';

import { doesDislike, doesLike } from '../utils/likingUtils';

const initialState = {
  dislikes: 0,
  entityId: 'ReLike',
  likes: 0,
  myRating: 0,
};

export default function searchResult(state = initialState, action) {
  switch (action.type) {
    case ReLikeActionTypes.GET_LIKE_COUNT_START:
    case ReLikeActionTypes.GET_MY_RATING_START: {
      return {
        ...state,
        entityId: action.payload.entityId,
      };
    }
    case ReLikeActionTypes.GET_LIKE_COUNT_SUCCESS: {
      const {
        meta: { entityId },
        payload: { result: { dislikes, likes } },
      } = action;

      if (entityId !== state.entityId) {
        return state;
      }
      return {
        ...state,
        entityId,
        dislikes,
        likes,
      };
    }
    case ReLikeActionTypes.GET_MY_RATING_SUCCESS: {
      const { meta: { entityId }, payload: { myRating } } = action;
      if (entityId !== state.entityId) {
        return state;
      }
      return {
        ...state,
        entityId,
        myRating,
      };
    }
    case ReLikeActionTypes.DISLIKE_START: {
      return {
        ...state,
        dislikes: state.dislikes + 1,
        likes: doesLike(state.myRating) ? state.likes - 1 : state.likes,
        myRating: Ratings.indexOf(RatingTypes.DISLIKE),
      };
    }
    case ReLikeActionTypes.LIKE_START: {
      return {
        ...state,
        dislikes: doesDislike(state.myRating) ? state.dislikes - 1 : state.dislikes,
        likes: state.likes + 1,
        myRating: Ratings.indexOf(RatingTypes.LIKE),
      };
    }
    case ReLikeActionTypes.NEW_LIKE: {
      const { payload: { dislikes, entityId, likes } } = action;
      if (entityId !== state.entityId) {
        return state;
      }
      return {
        ...state,
        dislikes,
        likes,
      };
    }
    case ReLikeActionTypes.UNDISLIKE_START: {
      return {
        ...state,
        dislikes: state.dislikes - 1,
        myRating: Ratings.indexOf(RatingTypes.UNRATED),
      };
    }
    case ReLikeActionTypes.UNLIKE_START: {
      return {
        ...state,
        likes: state.likes - 1,
        myRating: Ratings.indexOf(RatingTypes.UNRATED),
      };
    }
    default:
      return state;
  }
}
