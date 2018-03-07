import { combineReducers } from 'redux-immutable';
import userData from '../src/container/user/reducer';
import weatherData from '../src/container/dashboard/reducer';

export default combineReducers({
  userData,
  weatherData,
});
