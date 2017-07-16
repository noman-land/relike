import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav className="nav">
    <ul className="flex list-style-none p-0 m-0-t">
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/search">
          Search
        </Link>
      </li>
    </ul>
  </nav>
);
