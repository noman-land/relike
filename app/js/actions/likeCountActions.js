import { createAction } from 'redux-actions';

import actionTypes from '../actions/actionTypes';

export const getLikeCountError = createAction(
  actionTypes.GET_LIKE_COUNT_ERROR,
  error => ({ error }),
);

export const getLikeCountStart = createAction(
  actionTypes.GET_LIKE_COUNT_START,
  entityId => ({ entityId }),
);

export const getLikeCountSuccess = createAction(
  actionTypes.GET_LIKE_COUNT_SUCCESS,
  result => ({ result }),
  (result, entityId) => ({ entityId }),
);
