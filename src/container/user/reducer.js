import { combineReducers } from 'redux-immutable';
import { Map, fromJS } from 'immutable';
import { FACEBOOKSUCCESS, GOOGLESUCCESS, UPDATE_ADMIN_SIGN_UP } from '../../constants';
export function makeImmutable(val) {
  if (Array.isArray(val) || typeof val === 'object') {
    return fromJS(val);
  }
  return val;
}

const initialState = {
  userProfile: {},
};

const adminState = {
  adminProfile: {},
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

export function admin(state = Map(makeImmutable(adminState)), action) {
  switch (action.type) {
    case UPDATE_ADMIN_SIGN_UP:
      return state.setIn(['adminProfile', action.keyPath], action.value);
    default:
      return state;
  }
}

export default combineReducers({
  user,
  admin,
});
