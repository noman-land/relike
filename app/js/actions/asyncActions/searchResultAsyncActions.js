import ReLikeUtils from 'relike-utils';

import {
  getLikeCountError,
  getLikeCountStart,
  getLikeCountSuccess,
} from '../likeCountActions';

import {
  getMyRatingError,
  getMyRatingStart,
  getMyRatingSuccess,
} from '../myRatingActions';

const reLikeUtils = new ReLikeUtils({
  onLikeEvent: () => {},
});

export function getLikeCount(entityId) {
  return dispatch => {
    dispatch(getLikeCountStart(entityId));

    return reLikeUtils.getLikeCount(entityId)
    .then(result => dispatch(getLikeCountSuccess(result, entityId)))
    .catch(error => {
      console.error(error);
      dispatch(getLikeCountError(error));
    });
  };
}

export function getMyRating(entityId) {
  return dispatch => {
    dispatch(getMyRatingStart(entityId));

    return reLikeUtils.getMyRating(entityId)
    .then(result => dispatch(getMyRatingSuccess(result, entityId)))
    .catch(error => {
      console.error(error);
      dispatch(getMyRatingError(error));
    });
  };
}
