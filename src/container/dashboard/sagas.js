import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  fetUserMessage as fetchMessageAPI,
  fetchAllusers as usersAPI,
  getWeather as weatherAPI,
  saveLicense as saveLicenseAPI,
} from '../../api';
import { sendMessage as sendMessageAPI } from '../../api/message';
import { CREATE_LICENSE, FETCH_USER_MESSAGE, FETCH_USERS, GET_WEATHER, SEND_MESSAGE } from '../../constants';
import { getWeatherSuccess, fetchUsersSuccess, addChat } from './actions';

function* fetchUserChat(action) {
  try {
    const messages = yield call(fetchMessageAPI, action.id);
    yield put(addChat(action.id, messages, action.userId));
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
    debugger;
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
);
