import keyMirror from 'keymirror';

const actionTypes = keyMirror({
  GET_LIKE_COUNT_ERROR: null,
  GET_LIKE_COUNT_START: null,
  GET_LIKE_COUNT_SUCCESS: null,

  GET_MY_RATING_ERROR: null,
  GET_MY_RATING_SUCCESS: null,
  GET_MY_RATING_START: null,
});

export default actionTypes;
