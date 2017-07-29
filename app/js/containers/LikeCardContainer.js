import { connect } from 'react-redux';
import { ReLikeActions } from 'relike-redux-middleware';

import LikeCard from '../components/LikeCard';

import { getActiveAccount } from '../selectors/coreSelectors';

import {
  isDislikePending,
  isLikePending,
  isUnDislikePending,
  isUnLikePending,
} from '../selectors/pendingLikesSelectors';

import {
  getEntityId,
  getDislikeCountWithPending,
  getLikeCountWithPending,
  getMyRatingWithPending,
} from '../selectors/searchResultSelectors';

const mapStateToProps = state => ({
  disabled: !getActiveAccount(state),
  dislikes: getDislikeCountWithPending(state),
  entityId: getEntityId(state),
  isDislikePending: isDislikePending(state),
  isLikePending: isLikePending(state),
  isUnDislikePending: isUnDislikePending(state),
  isUnLikePending: isUnLikePending(state),
  likes: getLikeCountWithPending(state),
  myRating: getMyRatingWithPending(state),
});

const mapDispatchToProps = {
  dislike: ReLikeActions.dislike,
  getLikeData: ReLikeActions.getLikeData,
  getMyRating: ReLikeActions.getMyRating,
  like: ReLikeActions.like,
  unDislike: ReLikeActions.unDislike,
  unLike: ReLikeActions.unLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeCard);
