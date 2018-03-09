import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userData from '../src/container/user/reducer';
import dashboardData from '../src/container/dashboard/reducer';

export default combineReducers({
  userData,
  dashboardData,
  routing: routerReducer,
});
