import { connect } from 'react-redux';

import SearchPage from '../components/SearchPage';

import { getLikeData } from '../actions/asyncActions/searchResultAsyncActions';

const mapStateToProps = state => ({
  accountLoading: state.accountLoading,
  searchResult: state.searchResult,
});

const mapDispatchToProps = {
  getLikeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
