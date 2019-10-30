import WeatherHandler from './handlers/WeatherHandler';
import UIHandler from './handlers/UIHandler';

const Weather = new WeatherHandler();
const UI = new UIHandler();
const UIweatherSummary = document.getElementById('weather-summary');

const warsawGeolocation = {
  longitude: '21.0122',
  latitude: '52.2297'
};
Weather.getWeather(
  warsawGeolocation.longitude,
  warsawGeolocation.latitude
).then(data => {
  console.log(data);
  UI.updateWeatherSummary(UIweatherSummary, data);
});
