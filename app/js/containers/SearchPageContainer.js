import { connect } from 'react-redux';

import SearchPage from '../components/SearchPage';

import { getLikeCount } from '../actions/asyncActions/getLikeCount';

const mapStateToProps = state => ({
  accountLoading: state.accountLoading,
  searchResult: state.searchResult,
});

const mapDispatchToProps = {
  getLikeCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
