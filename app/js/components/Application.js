import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import Dashboard from './Dashboard';
import Nav from './Nav';
import SearchPage from './SearchPage';

export default () => (
  <BrowserRouter>
    <div className="flex-column p-4">
      <Nav />
      <Route exact path="/" component={Dashboard} />
      <Route path="/search" component={SearchPage} />
    </div>
  </BrowserRouter>
);
