import { combineReducers } from 'redux-immutable';
import { List, Map, fromJS } from 'immutable';
import {
  ADD_CHAT, ADD_CHAT_MESSAGE, ADD_USER, DISMISS_NOTIFICATION, ERROR_MESSAGES, FETCH_USERS_SUCCESS, GET_WEATHER_SUCCESS,
  RECEIVE_MESSAGE_SUCCESS,
  REMOVE_CHAT, SEARCH_USERS,
  SEND_MESSAGE, SET_NOTIFICATION,
  UPDATE_FIELDS,
  UPDATE_FILE, UPDATE_STATUS_FIELD, UPDATE_USER_MAP,
} from '../../constants';

export function makeImmutable(val) {
  if (Array.isArray(val) || typeof val === 'object') {
    return fromJS(val);
  }
  return val;
}


const initialChatState = {
  chatData: {
    chatOrder: [],
  },
};

const initialMessageState = {
  messages: [],
};

const initialLicense = {
  data: {},
};

export function weather(state = makeImmutable(List([{ coord: { lon: -0.13, lat: 51.5 } }])), action) {
  switch (action.type) {
    case GET_WEATHER_SUCCESS:
      return state.set(0, action.data);
    default:
      return state;
  }
}

export function messages(state = Map(makeImmutable(initialMessageState)), action) {
  switch (action.type) {
    case RECEIVE_MESSAGE_SUCCESS:
      return state.setIn(['messages'], action.messages);
    default:
      return state;
  }
}

export function chat(state = Map(makeImmutable(initialChatState)), action) {
  switch (action.type) {
    case ADD_CHAT:
      return state.setIn(['chatData', action.userId], action.value)
        .updateIn(['chatData', 'chatOrder'], (arr) => arr.filter((id) => (id !== action.userId)))
        .updateIn(['chatData', 'chatOrder'], (arr) => arr.push(action.userId));
    case ADD_CHAT_MESSAGE:
      return state.setIn(['chatData', 'message'], action.message);
    case SEND_MESSAGE:
      return state.setIn(['chatData', 'message'], '');
    case REMOVE_CHAT:
      return state.updateIn(['chatData', 'chatOrder'], (arr) => arr.pop());
    default:
      return state;
  }
}

export function data(state = Map(makeImmutable(initialLicense)), action) {
  switch (action.type) {
    case UPDATE_FIELDS:
      return state.setIn(['data', action.keyPath], action.value);
    case UPDATE_FILE:
      return state.setIn(['data', action.keyPath], action.value);
    default:
      return state;
  }
}

export function users(state = Map(makeImmutable({ allUsers: {} })), action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return state.setIn(['allUsers'], makeImmutable(action.data));
    case SEARCH_USERS:
      return state.setIn(['search'], action.data);
    case ADD_USER:
      return state.setIn(['display'], action.data);
    case UPDATE_USER_MAP:
      return state.setIn(['allUsers', action.id, 'map'], makeImmutable(action.status));
    default:
      return state;
  }
}

export function notification(state = Map(makeImmutable({})), action) {
  switch (action.type) {
    case SET_NOTIFICATION: {
      const { message, userProfile: { displayName, email } } = JSON.parse(action.data.notification.body);
      return state.setIn(['notif'], {
        body: {
          message,
          displayName,
          email,
        },
      });
    }
    case DISMISS_NOTIFICATION:
      return state.setIn(['notif'], {});
    default:
      return state;
  }
}

export function status(state = Map(makeImmutable({})), action) {
  switch (action.type) {
    case UPDATE_STATUS_FIELD:
      return state.setIn(['update'], action.value);
    default:
      return state;
  }
}

export function error(state = Map(makeImmutable({})), action) {
  switch (action.type) {
    case ERROR_MESSAGES:
      return state.setIn(['message'], action.msg);
    default:
      return state;
  }
}


export default combineReducers({
  weather,
  chat,
  error,
  messages,
  notification,
  data,
  users,
  status,
});
