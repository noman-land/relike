import { connect } from 'react-redux';
import { ReLikeActions } from 'relike-utils';

import SearchPage from '../components/SearchPage';

const mapStateToProps = state => ({
  activeAccount: state.activeAccount,
  pendingLikes: state.pendingLikes,
  searchResult: state.searchResult,
});

const mapDispatchToProps = {
  dislike: ReLikeActions.dislike,
  getLikeData: ReLikeActions.getLikeData,
  like: ReLikeActions.like,
  unDislike: ReLikeActions.unDislike,
  unLike: ReLikeActions.unLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
