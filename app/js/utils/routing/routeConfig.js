import Dashboard from '../../components/Dashboard';
import SearchPageContainer from '../../containers/SearchPageContainer';

import { path } from './routingUtils';

import { Routes } from '../../constants';

export default [
  {
    component: Dashboard,
    exact: true,
    path: path(),
  },
  {
    component: SearchPageContainer,
    path: path(Routes.SEARCH),
  },
];
