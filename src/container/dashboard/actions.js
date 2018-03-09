import {
  ADD_CHAT, REMOVE_CHAT, GET_WEATHER, GET_WEATHER_SUCCESS, UPDATE_FIELDS,
  CREATE_LICENSE, FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USER_MESSAGE, ADD_CHAT_MESSAGE, SEND_MESSAGE,
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

export function fetchUsers() {
  return {
    type: FETCH_USERS,
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
