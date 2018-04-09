import {
  ADD_CHAT, REMOVE_CHAT, GET_WEATHER, GET_WEATHER_SUCCESS, UPDATE_FIELDS,
  CREATE_LICENSE, FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USER_MESSAGE, ADD_CHAT_MESSAGE, SEND_MESSAGE,
  PUSH_NOTIFICATIONS, SEND_NOTIFICATION, SET_NOTIFICATION, DISMISS_NOTIFICATION, UPDATE_STATUS_FIELD, UPDATE_STATUS,
  UPDATE_VISIBILITY, FETCH_GOOGLE_MAPS, APPROVE_USER, REJECT_USERS, SEARCH_USERS, ADD_USER, ERROR_MESSAGES,
  UPDATE_OFFENCE, FETCH_USER, UPDATE_USER_MAP, SEND_SMS, RATING,
} from '../../constants';

export function getWeather(state) {
  return {
    type: GET_WEATHER,
    state,
  };
}

export function getWeatherSuccess(data) {
  return {
    type: GET_WEATHER_SUCCESS,
    data,
  };
}

export function updateFields(keyPath, value) {
  return {
    type: UPDATE_FIELDS,
    keyPath,
    value,
  };
}

export function submitForm(formData, id) {
  return {
    type: CREATE_LICENSE,
    formData,
    id,
  };
}

export function searchUsers(data) {
  return {
    type: SEARCH_USERS,
    data,
  };
}

export function addUser(data) {
  return {
    type: ADD_USER,
    data,
  };
}

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}

export function fetchUser(email) {
  return {
    type: FETCH_USER,
    email,
  };
}

export function fetchUsersSuccess(data) {
  return {
    type: FETCH_USERS_SUCCESS,
    data,
  };
}

export function submitMessage(message, id, userProfile) {
  return {
    type: SEND_MESSAGE,
    message,
    id,
    userProfile,
  };
}

export function addChat(id, value, userId) {
  return {
    type: ADD_CHAT,
    id,
    value,
    userId,
  };
}

export function addChatMessage(message) {
  return {
    type: ADD_CHAT_MESSAGE,
    message,
  };
}

export function fetchChatMessage(id, userId) {
  return {
    type: FETCH_USER_MESSAGE,
    id,
    userId,
  };
}

export function removeChat() {
  return {
    type: REMOVE_CHAT,
  };
}

export function registerPushNotification(id) {
  return {
    type: PUSH_NOTIFICATIONS,
    id,
  };
}

export function sendNotification(token, body) {
  return {
    type: SEND_NOTIFICATION,
    token,
    body,
  };
}

export function setNotification(data) {
  return {
    type: SET_NOTIFICATION,
    data,
  };
}

export function dismissNotification() {
  return {
    type: DISMISS_NOTIFICATION,
  };
}

export function updateStatusField(value) {
  return {
    type: UPDATE_STATUS_FIELD,
    value,
  };
}

export function updateStatus(id, status) {
  return {
    type: UPDATE_STATUS,
    id,
    status,
  };
}

export function toggleVisibiliy(id, visible) {
  return {
    type: UPDATE_VISIBILITY,
    id,
    visible,
  };
}

export function getMapData(id) {
  return {
    type: FETCH_GOOGLE_MAPS,
    id,
  };
}

export function approveUsers(id) {
  return {
    type: APPROVE_USER,
    id,
  };
}

export function rejectUsers(id) {
  return {
    type: REJECT_USERS,
    id,
  };
}

export function addErrorMessages(msg) {
  return {
    type: ERROR_MESSAGES,
    msg,
  };
}

export function sendSms(obj) {
  return {
    type: SEND_SMS,
    obj,
  };
}

export function updateOffence(offence, id) {
  return {
    type: UPDATE_OFFENCE,
    offence,
    id,
  };
}

export function updateUserMap(id, status) {
  return {
    type: UPDATE_USER_MAP,
    id,
    status,
  };
}

export function rating(obj) {
  return {
    type: RATING,
    obj,
  };
}

