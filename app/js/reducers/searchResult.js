import actionTypes from '../actions/actionTypes';

const initialState = {
  dislikes: 0,
  entityId: 'ReLike',
  likes: 0,
};

export default function searchResult(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LIKE_COUNT_SUCCESS: {
      return {
        entityId: action.meta.entityId,
        ...action.payload.result,
      };
    }
    default:
      return state;
  }
}
