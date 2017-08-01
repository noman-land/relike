import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activeAccount from './activeAccount';
import accountLoading from './accountLoading';
import pendingLikes from './pendingLikes';
import searchResult from './searchResult';

export default combineReducers({
  activeAccount,
  accountLoading,
  pendingLikes,
  searchResult,
  router: routerReducer,
});
