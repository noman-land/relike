import { ReLikeActionTypes } from 'relike-utils';

export default function accountLoading(state = true, action) {
  switch (action.type) {
    case ReLikeActionTypes.ACCOUNT_CHANGED_EVENT: {
      return false;
    }
    default:
      return state;
  }
}
