import { call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  approveUser as approveUserAPI,
  fetchAllusers as usersAPI,
  fetchUser as userAPI,
  getWeather as weatherAPI,
  rejectUser as rejectUserAPI,
  saveLicense as saveLicenseAPI,
  updateOffence as updateOffenceAPI,
  updateUserStatus as updateStatusAPI,
  updateVisibilityStatus as statusAPI,
  updateGeoLocation as updateLocationAPI,
} from '../../api';
import { getLocation as geolocationAPI } from '../../api/map';
import {
  sendMessage as sendMessageAPI,
  fetUserMessage as fetchMessageAPI,
  sendPushNotification as notificationAPI,
} from '../../api/message';
import {
  APPROVE_USER,
  CREATE_LICENSE, FETCH_GOOGLE_MAPS, FETCH_USER, FETCH_USER_MESSAGE, FETCH_USERS, GET_WEATHER, REJECT_USERS,
  SEND_MESSAGE,
  SEND_NOTIFICATION, UPDATE_OFFENCE, UPDATE_STATUS, UPDATE_VISIBILITY,
} from '../../constants';
import {
  getWeatherSuccess, fetchUsersSuccess, addChat,
  fetchChatMessage, fetchUsers as fetchAllUsers, fetchUser as fetchUserAction,
} from './actions';
import { googleSuccess } from '../user/actions';


function* approveUser(action) {
  try {
    const approve = yield call(approveUserAPI, action.id);
    yield put(fetchAllUsers());
  } catch (e) {
    console.log(e);
  }
}

function* rejectUser(action) {
  try {
    const reject = yield call(rejectUserAPI, action.id);
    yield put(fetchAllUsers());
  } catch (e) {
    console.log(e);
  }
}

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

function* fetchUser(action) {
  try {
    const user = yield call(userAPI, action.email);
    yield put(googleSuccess(user));
  } catch (e) {
    console.log(e);
  }
}

function* getWeatherData() {
  try {
    const weather = yield call(weatherAPI);
    yield put(getWeatherSuccess(weather));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

function* saveLicenseData(action) {
  try {
    const file = action.formData.upload;
    delete action.formData.upload;
    const response = yield call(saveLicenseAPI, action.formData, file[0], action.id);
    yield put(fetchAllUsers());
    yield put(fetchUserAction(action.id));
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
    yield put(fetchAllUsers());
  } catch (e) {
    console.log(e);
  }
}

function* updateVisibility(action) {
  try {
    yield call(statusAPI, action.id, action.visible);
    yield put(fetchAllUsers());
  } catch (e) {
    console.log(e);
  }
}

function* getMapData(action) {
  try {
    if (action.id) {
      const resp = yield call(geolocationAPI);
      const saveData = yield call(updateLocationAPI, resp.coords, action.id);
    }
  } catch (e) {
    console.log(e);
  }
}

function* updateOffence(action) {
  try {
    yield call(updateOffenceAPI, action.id, action.offence);
    yield put(fetchAllUsers());
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
  takeLatest(FETCH_GOOGLE_MAPS, getMapData), // eslint-disable-line
  takeLatest(APPROVE_USER, approveUser), // eslint-disable-line
  takeLatest(REJECT_USERS, rejectUser), // eslint-disable-line
  takeLatest(UPDATE_OFFENCE, updateOffence), // eslint-disable-line
  takeLatest(FETCH_USER, fetchUser), // eslint-disable-line
);
