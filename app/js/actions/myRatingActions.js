import { createAction } from 'redux-actions';

import actionTypes from '../actions/actionTypes';

export const getMyRatingError = createAction(
  actionTypes.GET_MY_RATING_ERROR,
  error => ({ error }),
);

export const getMyRatingStart = createAction(
  actionTypes.GET_MY_RATING_START,
  entityId => ({ entityId }),
);

export const getMyRatingSuccess = createAction(
  actionTypes.GET_MY_RATING_SUCCESS,
  myRating => ({ myRating }),
  (myRating, entityId) => ({ entityId }),
);
