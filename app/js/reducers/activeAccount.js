import { ReLikeActionTypes } from 'relike-utils';

export default function activeAccount(state = null, action) {
  switch (action.type) {
    case ReLikeActionTypes.ACCOUNT_CHANGED_EVENT: {
      return action.payload.newAccount;
    }
    default:
      return state;
  }
}
