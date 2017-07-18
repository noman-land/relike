import React from 'react';
import PropTypes from 'prop-types';

export default function LikeDislikeRatio({ dislikes, likes }) {
  const totalRatings = likes + dislikes;
  const dislikeWidth = (dislikes / totalRatings) * 100;
  const likeWidth = (likes / totalRatings) * 100;

  return (
    <div className="flex-row">
      <div style={{ background: 'green', height: '5px', width: `${likeWidth}%` }} />
      <div style={{ background: 'red', height: '5px', width: `${dislikeWidth}%` }} />
    </div>
  );
}

LikeDislikeRatio.propTypes = {
  dislikes: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};
