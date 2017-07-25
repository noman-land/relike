import React from 'react';
import PropTypes from 'prop-types';

import LikeDislikeRatio from './LikeDislikeRatio';
import Thumb from './Thumb';

import { doesDislike, doesLike } from '../utils/likingUtils';

export default function LikeCard({
  disabled,
  dislikes,
  entityId,
  isDislikePending,
  isLikePending,
  isUnDislikePending,
  isUnLikePending,
  likes,
  myRating,
  onDislikeClick,
  onLikeClick,
}) {
  return (
    <div className="flex-column p-0 border-solid border-1 border-radius-2 border-grey-lt m-4-t">
      <div key={entityId} className="result">
        {disabled && (
          <div className="overlay">
            <span className="overlay-message">
              Please log in
            </span>
          </div>
        )}

        <span className="text-center ellipsis text-size-12 p-8-y">
          {entityId}
        </span>
        <div className="flex flex-grow-1 justify-space-between p-4">
          <Thumb
            active={doesLike(myRating)}
            count={likes}
            direction={'up'}
            disabled={disabled}
            filled={false}
            onClick={onLikeClick}
            pending={isLikePending || isUnLikePending}
            textSize={8}
            thumbSize={14}
          />
          <Thumb
            active={doesDislike(myRating)}
            count={dislikes}
            direction={'down'}
            disabled={disabled}
            filled={false}
            onClick={onDislikeClick}
            pending={isDislikePending || isUnDislikePending}
            textSize={8}
            thumbSize={14}
          />
        </div>
        <LikeDislikeRatio dislikes={dislikes} likes={likes} />
      </div>
    </div>
  );
}

LikeCard.propTypes = {
  disabled: PropTypes.bool,
  dislikes: PropTypes.number.isRequired,
  entityId: PropTypes.string.isRequired,
  isDislikePending: PropTypes.bool.isRequired,
  isLikePending: PropTypes.bool.isRequired,
  isUnDislikePending: PropTypes.bool.isRequired,
  isUnLikePending: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  myRating: PropTypes.number.isRequired,
  onDislikeClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
};

LikeCard.defaultProps = {
  disabled: false,
};
