import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const inputClassNames = classnames([
  'border-1',
  'border-grey-lt',
  'border-radius-2',
  'border-solid',
  'outline-none',
  'p-4',
  'text-size-7',
]);

export default class SearchBar extends Component {
  static get propTypes() {
    return {
      onInputChange: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      searchInput: PropTypes.string.isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit(event);
    this.input.blur();
  }

  render() {
    const { searchInput, onInputChange } = this.props;
    return (
      <form className="flex-column" onSubmit={this.handleSubmit}>
        <input
          className={inputClassNames}
          ref={(input) => { this.input = input; }}
          onChange={onInputChange}
          placeholder="find something to like"
          value={searchInput}
        />
      </form>
    );
  }
}
