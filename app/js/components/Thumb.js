import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Thumb({
  active,
  count,
  direction,
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

  const thumbClasses = classnames([
    'fa',
    `fa-thumbs${filledClass}-${direction}`,
    { 'loading-pulsate': pending },
    { 'text-blue': active },
  ]);

  return (
    <div className={containerClasses}>
      <i aria-hidden="true" className={thumbClasses} onClick={onClick} />
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
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  textSize: PropTypes.number.isRequired,
  thumbSize: PropTypes.number.isRequired,
};
