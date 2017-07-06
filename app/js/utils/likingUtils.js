import { Ratings, RatingTypes } from '../constants';

export const doesDislike = myRating => Ratings[myRating] === RatingTypes.DISLIKE;
export const doesLike = myRating => Ratings[myRating] === RatingTypes.LIKE;
