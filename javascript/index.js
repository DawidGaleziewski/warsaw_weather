import WeatherHandler from './handlers/WeatherHandler';
import UIHandler from './handlers/UIHandler';

const Weather = new WeatherHandler();
const UI = new UIHandler();
// eslint-disable-next-line no-undef
const UIweatherSummary = document.getElementById('weather-summary');
const UIweatherForecast = document.getElementById('weather-forecast');

const warsawGeolocation = {
  longitude: '21.0122',
  latitude: '52.2297'
};
// 1. Get API weather data
Weather.getWeather(
  warsawGeolocation.longitude,
  warsawGeolocation.latitude
).then(data => {
  // 2. Update the DOM with forecast data
  UI.updateWeatherSummary(UIweatherSummary, data);
  UI.updateWeatherForcesat(UIweatherForecast, data);
});
