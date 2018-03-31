import {
  FACEBOOK_SIGN,
  GOOGLE_SIGN,
  FACEBOOKSUCCESS,
  GOOGLESUCCESS, SIGN_UP, UPDATE_ADMIN_SIGN_UP, UPDATE_USER_LOCATION,
} from '../../constants';

export function facebookSignIn() {
  return {
    type: FACEBOOK_SIGN,
  };
}

export function googleSignIn() {
  return {
    type: GOOGLE_SIGN,
  };
}

export function facebookSuccess(user) {
  return {
    type: FACEBOOKSUCCESS,
    user,
  };
}

export function googleSuccess(user) {
  return {
    type: GOOGLESUCCESS,
    user,
  };
}

export function updateAdminSignUp(keyPath, value) {
  return {
    type: UPDATE_ADMIN_SIGN_UP,
    keyPath,
    value,
  };
}

export function updateGeoLocationAddress(id, address) {
  return {
    type: UPDATE_USER_LOCATION,
    id,
    address,
  };
}

export function adminSignUp() {
  return {
    type: SIGN_UP,
  };
}

