import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { FACEBOOKSUCCESS, GOOGLESUCCESS } from '../../constants';

const initialState = {
  userProfile: {},
};

export function user(state = Map(initialState), action) {
  switch (action.type) {
    case FACEBOOKSUCCESS:
    case GOOGLESUCCESS:
      return state.setIn(['userProfile'], action.user);
    default:
      return state;
  }
}

export default combineReducers({
  user,
});
