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
  const isDislikeActive = isDislikePending
    || (doesDislike(myRating) && !isLikePending && !isUnDislikePending);

  const isLikeActive = isLikePending
    || (doesLike(myRating) && !isDislikePending && !isUnLikePending);

  const dislikesWithPending = (() => {
    if (isDislikePending) {
      return dislikes + 1;
    }

    if (isUnDislikePending || (doesDislike(myRating) && isLikePending)) {
      return dislikes - 1;
    }

    return dislikes;
  })();

  const likesWithPending = (() => {
    if (isLikePending) {
      return likes + 1;
    }

    if (isUnLikePending || (doesLike(myRating) && isDislikePending)) {
      return likes - 1;
    }

    return likes;
  })();

  const isRated = likesWithPending > 0 || dislikesWithPending > 0;

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
            active={isLikeActive}
            count={likesWithPending}
            direction={'up'}
            disabled={disabled}
            filled={false}
            onClick={onLikeClick}
            pending={isLikePending || isUnLikePending}
            textSize={8}
            thumbSize={14}
          />
          <Thumb
            active={isDislikeActive}
            count={dislikesWithPending}
            direction={'down'}
            disabled={disabled}
            filled={false}
            onClick={onDislikeClick}
            pending={isDislikePending || isUnDislikePending}
            textSize={8}
            thumbSize={14}
          />
        </div>
        {isRated && (
          <LikeDislikeRatio
            dislikes={dislikesWithPending}
            likes={likesWithPending}
          />
        )}
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
