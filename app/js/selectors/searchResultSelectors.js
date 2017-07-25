import { createSelector } from 'reselect';

import { getPendingLikes, getSearchResult } from './coreSelectors';

import searchResultReducer from '../reducers/searchResult';

export const getEntityId = createSelector(
  [getSearchResult],
  searchResult => searchResult.entityId,
);

export const getSearchResultWithPending = createSelector(
  [getPendingLikes, getSearchResult],
  (pendingLikes, searchResult) => {
    if (!pendingLikes.pendingActions.has(searchResult.entityId)) {
      return searchResult;
    }

    return pendingLikes.pendingActions
      .get(searchResult.entityId)
      .reduce(searchResultReducer, searchResult);
  },
);

export const getLikeCountWithPending = createSelector(
  [getSearchResultWithPending],
  searchResultWithPending => searchResultWithPending.likes,
);

export const getDislikeCountWithPending = createSelector(
  [getSearchResultWithPending],
  searchResultWithPending => searchResultWithPending.dislikes,
);

export const getMyRatingWithPending = createSelector(
  [getSearchResultWithPending],
  searchResultWithPending => searchResultWithPending.myRating,
);
