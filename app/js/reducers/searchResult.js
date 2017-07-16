import actionTypes from '../actions/actionTypes';

const initialState = {
  dislikes: 0,
  entityId: 'ReLike',
  likes: 0,
  myRating: 0,
};

export default function searchResult(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LIKE_COUNT_SUCCESS: {
      const {
        meta: { entityId },
        payload: {
          result: {
            dislikes,
            likes,
          },
        },
      } = action;

      return {
        ...state,
        entityId,
        dislikes,
        likes,
      };
    }
    case actionTypes.GET_MY_RATING_SUCCESS: {
      const { meta: { entityId }, payload: { myRating } } = action;
      return {
        ...state,
        entityId,
        myRating,
      };
    }
    default:
      return state;
  }
}
