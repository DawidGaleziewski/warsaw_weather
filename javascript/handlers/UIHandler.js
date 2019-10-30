/* eslint-disable class-methods-use-this */
class UIHandler {
  kelvinToCelsius(kelvinDegrees) {
    const celsius = (kelvinDegrees - 273.15).toFixed(1);
    return celsius;
  }

  updateWeatherSummary(UIWeatherSumary, weatherForecastData) {
    const UIDay = UIWeatherSumary.querySelector('.day');
    const UIDate = UIWeatherSumary.querySelector('.date');
    const UIWindSpeed = UIWeatherSumary.querySelector('.wind-speed');
    const UIHumidity = UIWeatherSumary.querySelector('.humidity');
    const UIWeatherIconImage = UIWeatherSumary.querySelector(
      '.weather-icon__image'
    );
    const UIweatherIconCaption = UIWeatherSumary.querySelector(
      '.weather-icon__caption'
    );
    const UIdegree = UIWeatherSumary.querySelector('.degree');

    const dateObject = new Date(weatherForecastData.list[0].dt_txt);
    const dayOfTheWeek = dateObject.toUTCString().split(',')[0];
    const yearMonthDay = `${dateObject.getFullYear()}/${dateObject.getUTCMonth() +
      1}/${dateObject.getUTCDate() + 1}`;
    const windSpeed = weatherForecastData.list[0].wind.speed;
    const humidity = weatherForecastData.list[0].main.humidity;
    const weatherIconURL = `http://openweathermap.org/img/wn/${weatherForecastData.list[0].weather[0].icon}@2x.png`;
    const weatherDescription =
      weatherForecastData.list[0].weather[0].description;
    const tempCelcius = this.kelvinToCelsius(
      weatherForecastData.list[0].main.temp
    );
    UIDay.innerText = dayOfTheWeek;
    UIDate.innerText = yearMonthDay;
    UIWindSpeed.innerText = `Wind: ${windSpeed} km/h`;
    UIHumidity.innerText = `${humidity}%`;
    UIWeatherIconImage.src = weatherIconURL;
    UIweatherIconCaption.innerText = weatherDescription;
    UIdegree.innerHTML = `${tempCelcius} &deg`;
  }
}

export default UIHandler;
