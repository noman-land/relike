import { connect } from 'react-redux';
import { ReLikeActions } from 'relike-utils';

import SearchPage from '../components/SearchPage';

import { getSearchResultWithPending } from '../selectors/searchResultSelectors';

const mapStateToProps = state => ({
  activeAccount: state.activeAccount,
  pendingLikes: state.pendingLikes,
  searchResult: getSearchResultWithPending(state),
});

const mapDispatchToProps = {
  dislike: ReLikeActions.dislike,
  getLikeData: ReLikeActions.getLikeData,
  getMyRating: ReLikeActions.getMyRating,
  like: ReLikeActions.like,
  unDislike: ReLikeActions.unDislike,
  unLike: ReLikeActions.unLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
