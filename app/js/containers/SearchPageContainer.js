import { connect } from 'react-redux';

import SearchPage from '../components/SearchPage';

const mapStateToProps = state => {
  return {
    accountLoading: state.accountLoading,
  };
};

export default connect(mapStateToProps)(SearchPage);
