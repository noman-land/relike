import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const inputClassNames = classnames([
  'border-1',
  'border-grey-lt',
  'border-radius-2',
  'border-solid',
  'outline-none',
  'p-4',
  'text-size-7',
]);

const SearchBar = ({ searchInput, onInputChange, onSubmit }) => (
  <form className="flex-column" onSubmit={onSubmit}>
    <input
      className={inputClassNames}
      onChange={onInputChange}
      value={searchInput}
    />
  </form>
);

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
