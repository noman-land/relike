import { connect } from 'react-redux';

import SearchPage from '../components/SearchPage';

import { getLikeCount, getMyRating } from '../actions/asyncActions/searchResultAsyncActions';

const mapStateToProps = state => ({
  accountLoading: state.accountLoading,
  searchResult: state.searchResult,
});

const mapDispatchToProps = {
  getLikeCount,
  getMyRating,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
