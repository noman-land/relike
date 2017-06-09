import { Ratings, RatingTypes } from '../constants';

export const doesDislike = myRating => {
  return Ratings[myRating] === RatingTypes.DISLIKE;
};

export const doesLike = myRating => {
  return Ratings[myRating] === RatingTypes.LIKE;
};
