import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Nav = props => {
  console.log(props);
  return (
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
}

export default withRouter(Nav);
