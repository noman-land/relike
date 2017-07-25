import { createSelector } from 'reselect';

import { getPendingLikes, getSearchResult } from './coreSelectors';

export const isDislikePending = createSelector(
  [getPendingLikes, getSearchResult],
  (pendingLikes, searchResult) => pendingLikes.isDislikePending(searchResult.entityId),
);

export const isLikePending = createSelector(
  [getPendingLikes, getSearchResult],
  (pendingLikes, searchResult) => pendingLikes.isLikePending(searchResult.entityId),
);

export const isUnDislikePending = createSelector(
  [getPendingLikes, getSearchResult],
  (pendingLikes, searchResult) => pendingLikes.isUnDislikePending(searchResult.entityId),
);

export const isUnLikePending = createSelector(
  [getPendingLikes, getSearchResult],
  (pendingLikes, searchResult) => pendingLikes.isUnLikePending(searchResult.entityId),
);
