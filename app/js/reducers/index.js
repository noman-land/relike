import { combineReducers } from 'redux';

import accountLoading from './accountLoading';
import pendingLikes from './pendingLikes';
import searchResult from './searchResult';

export default combineReducers({
  accountLoading,
  pendingLikes,
  searchResult,
});
