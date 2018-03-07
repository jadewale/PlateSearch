import { GET_WEATHER, GET_WEATHER_SUCCESS } from '../../constants';

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
