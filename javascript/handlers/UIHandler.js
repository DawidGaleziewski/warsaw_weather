/* eslint-disable class-methods-use-this */
class UIHandler {
  kelvinToCelsius(kelvinDegrees) {
    const celsius = (kelvinDegrees - 273.15).toFixed(1);
    return celsius;
  }

  filterForecastForToday(weatherForecastData) {
    return weatherForecastData.list.filter((singleForecast, index, array) => {
      const todaysDate = new Date(array[0].dt_txt);
      const singleForecastDate = new Date(singleForecast.dt_txt);
      return todaysDate.getDay() === singleForecastDate.getDay();
    });
  }

  updateWeatherSummary(UIWeatherSumary, weatherForecastData) {
    // Get UI
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
    // Format data from API
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
    // Update DOM with API data
    UIDay.innerText = dayOfTheWeek;
    UIDate.innerText = yearMonthDay;
    UIWindSpeed.innerText = `Wind: ${windSpeed} km/h`;
    UIHumidity.innerText = `${humidity}%`;
    UIWeatherIconImage.src = weatherIconURL;
    UIweatherIconCaption.innerText = weatherDescription;
    UIdegree.innerHTML = `${tempCelcius} &deg`;
  }

  updateWeatherForcesat(UIWeatherForecast, weatherForecastData) {
    let finalForecastList = '';
    // 1 Filter data only with information for today
    const weatherForecastDataForToday = this.filterForecastForToday(
      weatherForecastData
    );
    // 2. Format data from API
    weatherForecastDataForToday.forEach(singleForecast => {
      const dateObject = new Date(singleForecast.dt_txt);
      const dayOfTheWeek = dateObject.toUTCString().split(',')[0];
      const hour = `${dateObject.getUTCHours()}:00`;
      const tempCelcius = this.kelvinToCelsius(singleForecast.main.temp);
      const weatherIconURL = `http://openweathermap.org/img/wn/${singleForecast.weather[0].icon}@2x.png`;
      // 3. Agregate the dom data for each forecast element
      const singleForecastTemplate = `<li class="weather-forecast__item">
      <ul>
        <li class="day">
          ${dayOfTheWeek}
        </li>
        <li class="hour">
          ${hour}
        </li>
        <li class="icon">
          <img src="${weatherIconURL}" alt="Weather icon">
        </li>
        <li class="degree">
          ${tempCelcius}&deg
        </li>
      </ul>
    </li>`;

      finalForecastList += singleForecastTemplate;
    });
    // 4. Update the DOM
    UIWeatherForecast.innerHTML = finalForecastList;
  }
}

export default UIHandler;
