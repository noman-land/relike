import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import Thumb from './Thumb';

import { doesDislike, doesLike } from '../utils/likingUtils';

export default function LikeCard({
  dislikes,
  entityId,
  likes,
  myRating,
  onDislikeClick,
  onLikeClick,
  pendingLikes,
}) {
  const likePending = !!(pendingLikes.getIn([entityId, 'like'])
    || pendingLikes.getIn([entityId, 'unLike']));

  const dislikePending = !!(pendingLikes.getIn([entityId, 'dislike'])
    || pendingLikes.getIn([entityId, 'unDislike']));

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
            pending={likePending}
            textSize={8}
            thumbSize={14}
          />
          <Thumb
            active={doesDislike(myRating)}
            count={dislikes}
            direction={'down'}
            filled={false}
            onClick={onDislikeClick}
            pending={dislikePending}
            textSize={8}
            thumbSize={14}
          />
        </div>
      </div>
    </div>
  );
}

LikeCard.propTypes = {
  dislikes: PropTypes.number.isRequired,
  entityId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  myRating: PropTypes.number.isRequired,
  onDislikeClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  pendingLikes: ImmutablePropTypes.map.isRequired,
};
