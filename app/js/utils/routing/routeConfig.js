import Dashboard from '../../components/Dashboard';
import SearchPage from '../../components/SearchPage';

import { path } from './routingUtils';

import { Routes } from '../../constants';

export default [
  {
    component: Dashboard,
    exact: true,
    path: path(),
  },
  {
    component: SearchPage,
    path: path(Routes.SEARCH),
  },
];
