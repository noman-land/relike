import ReLikeUtils from 'relike-utils';

import {
  getLikeCountError,
  getLikeCountStart,
  getLikeCountSuccess,
} from '../likeCountActions';

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
