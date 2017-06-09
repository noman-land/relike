import React from 'react';
import PropTypes from 'prop-types';

import Thumb from './Thumb';

import { Ratings, RatingTypes } from '../constants';

const LikeCard = ({
  dislikes,
  entityId,
  likes,
  myRating,
  onDislikeClick,
  onLikeClick,
}) => (
  <div className="flex-column p-0 border-solid border-1 border-radius-2 border-grey-lt m-4-t">
    <div key={entityId} className="result">
      <span className="text-center ellipsis text-size-12 p-8-y">
        {entityId}
      </span>
      <div className="flex flex-grow-1 justify-space-between p-4">
        <Thumb
          active={Ratings[myRating] === RatingTypes.LIKE}
          count={likes}
          direction={'up'}
          filled={false}
          onClick={onLikeClick}
          textSize={8}
          thumbSize={14}
        />
        <Thumb
          active={Ratings[myRating] === RatingTypes.DISLIKE}
          count={dislikes}
          direction={'down'}
          filled={false}
          onClick={onDislikeClick}
          textSize={8}
          thumbSize={14}
        />
      </div>
    </div>
  </div>
);

LikeCard.propTypes = {
  dislikes: PropTypes.number.isRequired,
  entityId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  myRating: PropTypes.number.isRequired,
  onDislikeClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
};

export default LikeCard;
