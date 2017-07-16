import { combineReducers } from 'redux';

import accountLoading from './accountLoading';
import searchResult from './searchResult';

export default combineReducers({
  accountLoading,
  searchResult,
});
