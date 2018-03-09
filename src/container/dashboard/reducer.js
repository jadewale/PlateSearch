import { combineReducers } from 'redux-immutable';
import { List, Map, fromJS } from 'immutable';
import {
  ADD_CHAT, ADD_CHAT_MESSAGE, FETCH_USERS_SUCCESS, GET_WEATHER_SUCCESS, RECEIVE_MESSAGE_SUCCESS, REMOVE_CHAT,
  SEND_MESSAGE,
  UPDATE_FIELDS,
  UPDATE_FILE,
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

export function users(state = Map(makeImmutable({})), action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return state.setIn(['allUsers'], action.data);
    default:
      return state;
  }
}

export default combineReducers({
  weather,
  chat,
  messages,
  data,
  users,
});
