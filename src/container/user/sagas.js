import { call, put, takeLatest } from 'redux-saga/effects';

import { googleSignIn as googleAPI, facebookSignIn as facebookAPI } from '../../api/user';

import { GOOGLE_SIGN, FACEBOOK_SIGN } from '../../constants';

import { googleSuccess, facebookSuccess } from './actions';

function* googleSign() {
  try {
    const google = yield call(googleAPI);
    yield put(googleSuccess(google));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

function* facebookSign() {
  try {
    const facebook = yield call(facebookAPI);
    yield put(facebookSuccess(facebook));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}


export default [].concat(
  takeLatest(GOOGLE_SIGN, googleSign), // eslint-disable-line
  takeLatest(FACEBOOK_SIGN, facebookSign), // eslint-disable-line
);
