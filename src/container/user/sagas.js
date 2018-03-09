import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { authenticator as authApi } from '../../api/index';
import PushNotification from '../../api/pushNotifications';
import { GOOGLE_SIGN, FACEBOOK_SIGN, FACEBOOK, GOOGLE } from '../../constants';
import { googleSuccess, facebookSuccess } from './actions';

function* googleSign() {
  try {
    const response = yield call(authApi, GOOGLE);
    if (response.success) {
      yield put(googleSuccess(response));
      yield put(push('/dashboard'));
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}


function* facebookSign() {
  try {
    const response = yield call(authApi, FACEBOOK);
    if (response.success) { yield put(facebookSuccess(response)); }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}


export default [].concat(
  takeLatest(GOOGLE_SIGN, googleSign), // eslint-disable-line
  takeLatest(FACEBOOK_SIGN, facebookSign), // eslint-disable-line
);
