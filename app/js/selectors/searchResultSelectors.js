import { createSelector } from 'reselect';

import { getPendingLikes, getSearchResult } from './coreSelectors';

import searchResultReducer from '../reducers/searchResult';

export const getSearchResultWithPending = createSelector(
  [getPendingLikes, getSearchResult],
  (pendingLikes, searchResult) => {
    if (!pendingLikes.has(searchResult.entityId)) {
      return searchResult;
    }

    return pendingLikes
      .get(searchResult.entityId)
      .reduce(searchResultReducer, searchResult);
  },
);
