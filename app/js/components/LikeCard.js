import React from 'react';
import PropTypes from 'prop-types';

import LikeDislikeRatio from './LikeDislikeRatio';
import Thumb from './Thumb';

import { doesDislike, doesLike } from '../utils/likingUtils';

export default function LikeCard({
  dislikes,
  entityId,
  isDislikePending,
  isLikePending,
  likes,
  myRating,
  onDislikeClick,
  onLikeClick,
}) {
  const isRated = likes > 0 || dislikes > 0;
  return (
    <div className="flex-column p-0 border-solid border-1 border-radius-2 border-grey-lt m-4-t">
      <div key={entityId} className="result">
        <span className="text-center ellipsis text-size-12 p-8-y">
          {entityId}
        </span>
        <div className="flex flex-grow-1 justify-space-between p-4">
          <Thumb
            active={doesLike(myRating)}
            count={likes}
            direction={'up'}
            filled={false}
            onClick={onLikeClick}
            pending={isLikePending}
            textSize={8}
            thumbSize={14}
          />
          <Thumb
            active={doesDislike(myRating)}
            count={dislikes}
            direction={'down'}
            filled={false}
            onClick={onDislikeClick}
            pending={isDislikePending}
            textSize={8}
            thumbSize={14}
          />
        </div>
        {isRated && (
          <LikeDislikeRatio dislikes={dislikes} likes={likes} />
        )}
      </div>
    </div>
  );
}

LikeCard.propTypes = {
  dislikes: PropTypes.number.isRequired,
  entityId: PropTypes.string.isRequired,
  isLikePending: PropTypes.bool.isRequired,
  isDislikePending: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  myRating: PropTypes.number.isRequired,
  onDislikeClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
};
