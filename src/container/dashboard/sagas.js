import { call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  fetchAllusers as usersAPI,
  getWeather as weatherAPI,
  saveLicense as saveLicenseAPI,
  updateUserStatus as updateStatusAPI,
  updateVisibilityStatus as statusAPI,
} from '../../api';
import {
  sendMessage as sendMessageAPI,
  fetUserMessage as fetchMessageAPI,
  sendPushNotification as notificationAPI,
} from '../../api/message';
import {
  CREATE_LICENSE, FETCH_USER_MESSAGE, FETCH_USERS, GET_WEATHER, SEND_MESSAGE,
  SEND_NOTIFICATION, UPDATE_STATUS, UPDATE_VISIBILITY,
} from '../../constants';
import { getWeatherSuccess, fetchUsersSuccess, addChat, fetchChatMessage } from './actions';

function* fetchUserChat(action) {
  try {
    let messages = yield call(fetchMessageAPI, action.id);
    if (messages) {
      messages = Object.keys(messages).map((data) => (messages[data]));
      yield put(addChat(action.id, messages, action.userId));
    } else {
      yield put(addChat(action.id, [], action.userId));
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

function* fetchUsers() {
  try {
    const users = yield call(usersAPI);
    yield put(fetchUsersSuccess(users));
  } catch (e) {
    console.log(e);
  }
}

function* getWeatherData() {
  try {
    const weather = yield call(weatherAPI);
    yield put(getWeatherSuccess(weather.data));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

function* saveLicenseData(action) {
  try {
    const file = action.formData.upload;
    delete action.formData.upload;
    const response = yield call(saveLicenseAPI, action.formData, file[0], action.id);
    // yield put();
  } catch (e) {
    console.log(e);
  }
}

function* sendChat(action) {
  try {
    const response = yield call(sendMessageAPI, action);
    if (response.success) {
      const { email } = action.userProfile;
      yield put(fetchChatMessage(action.id, email));
    }
  } catch (e) {
    console.log(e);
  }
}

function* sendPushNotification(action) {
  try {
    yield fork(notificationAPI, action.token, action.body);
  } catch (e) {
    console.log(e);
  }
}

function* updateStatus(action) {
  try {
    yield call(updateStatusAPI, action.id, action.status);
  } catch (e) {
    console.log(e);
  }
}

function* updateVisibility(action) {
  try {
    yield call(statusAPI, action.id, action.visible);
  } catch (e) {
    console.log(e);
  }
}

function* receiveChat() {
  try {

  } catch (e) {
    console.log(e);
  }
}

export default [].concat(
  takeLatest(GET_WEATHER, getWeatherData), // eslint-disable-line
  takeLatest(CREATE_LICENSE, saveLicenseData), // eslint-disable-line
  takeLatest(FETCH_USERS, fetchUsers), // eslint-disable-line
  takeEvery(FETCH_USER_MESSAGE, fetchUserChat), // eslint-disable-line
  takeLatest(SEND_MESSAGE, sendChat), // eslint-disable-line
  takeEvery(SEND_NOTIFICATION, sendPushNotification), // eslint-disable-line
  takeLatest(UPDATE_STATUS, updateStatus), // eslint-disable-line
  takeLatest(UPDATE_VISIBILITY, updateVisibility), // eslint-disable-line
);
