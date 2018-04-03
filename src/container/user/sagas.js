import { call, put, take, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import { authenticator as authApi, updateGeoLocationAddress as updateAddressAPI } from '../../api/index';
import { getToken as getTokenAPI } from '../../api/pushNotifications';
import {
  GOOGLE_SIGN, FACEBOOK_SIGN, FACEBOOK, GOOGLE, PUSH_NOTIFICATIONS,
  UPDATE_USER_LOCATION
} from '../../constants';
import { googleSuccess, facebookSuccess } from './actions';
import { dismissNotification, fetchUser, setNotification } from '../dashboard/actions';

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
    if (response.success) {
      yield put(facebookSuccess(response));
      yield put(push('/dashboard'));
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

function* closeNotification() {
  yield delay(10000);
  yield put(dismissNotification());
}

function* registerPushNotification(action) {
  try {
    const response = yield call(getTokenAPI, action.id);
    while (true) {
      const value = yield take(response);
      if (value.notification) {
        yield put(setNotification(value.notification));
        yield call(closeNotification);
      }

      if (value.token) {

      }
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

function* updateUserGeoLocation(action) {
  try {
    yield call(updateAddressAPI, action.id, action.address);
    yield put(fetchUser(action.id));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}


export default [].concat(
  takeLatest(GOOGLE_SIGN, googleSign), // eslint-disable-line
  takeLatest(FACEBOOK_SIGN, facebookSign), // eslint-disable-line
  takeLatest(PUSH_NOTIFICATIONS, registerPushNotification), // eslint-disable-line
  takeLatest(UPDATE_USER_LOCATION, updateUserGeoLocation), // eslint-disable-line
);
