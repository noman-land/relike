import { connect } from 'react-redux';
import { ReLikeActions } from 'relike-redux-middleware';

import SearchPage from '../components/SearchPage';

import { getActiveAccount } from '../selectors/coreSelectors';
import { getSearchResultWithPending } from '../selectors/searchResultSelectors';

const mapStateToProps = state => ({
  activeAccount: getActiveAccount(state),
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
