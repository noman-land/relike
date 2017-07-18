import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Thumb({
  active,
  count,
  direction,
  disabled,
  filled,
  onClick,
  pending,
  textSize,
  thumbSize,
}) {
  const containerClasses = classnames([
    'align-items-center',
    'flex',
    'flex-grow-1',
    'justify-center',
    'text-grey',
    `text-size-${thumbSize}`,
  ]);

  const filledClass = filled ? '' : '-o';

  const buttonClasses = classnames([
    'bg-transparent',
    'border-0',
    { disabled },
    'fa',
    `fa-thumbs${filledClass}-${direction}`,
    { 'loading-pulsate': pending },
    'outline-none',
    { 'text-grey': !active },
    { 'text-blue': active },
  ]);

  return (
    <div className={containerClasses}>
      <button className={buttonClasses} onClick={onClick} disabled={disabled}>
        <i aria-hidden="true" />
      </button>
      <span className={`text-size-${textSize} m-4-l`}>
        {count}
      </span>
    </div>
  );
};

Thumb.propTypes = {
  active: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['up', 'down']).isRequired,
  disabled: PropTypes.bool,
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  textSize: PropTypes.number.isRequired,
  thumbSize: PropTypes.number.isRequired,
};

Thumb.defaultProps = {
  disabled: false,
};
