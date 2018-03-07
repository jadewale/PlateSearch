import {
  FACEBOOK_SIGN,
  GOOGLE_SIGN,
  FACEBOOKSUCCESS,
  GOOGLESUCCESS,
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

