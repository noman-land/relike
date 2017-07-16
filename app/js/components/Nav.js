import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { path } from '../utils/routing/routingUtils';

import { Routes } from '../constants';

const Nav = () => (
  <nav className="nav">
    <ul className="flex list-style-none p-0 m-0-t">
      <li>
        <Link to={path()}>
          Home
        </Link>
      </li>
      <li>
        <Link to={path(Routes.SEARCH)}>
          Search
        </Link>
      </li>
    </ul>
  </nav>
);

export default withRouter(Nav);
