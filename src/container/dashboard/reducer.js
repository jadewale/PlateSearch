import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';
import { GET_WEATHER_SUCCESS } from '../../constants';

export function weather(state = List([]), action) {
  switch (action.type) {
    case GET_WEATHER_SUCCESS:
      return state.push(action.data);
    default:
      return state;
  }
}

export default combineReducers({
  weather,
});
