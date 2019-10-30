class WeatherHandler {
  constructor() {
    this.apiKey = 'e7336c281c3b4f9e7da03a467444db14';
    this.url = 'https://api.openweathermap.org/data/2.5/';
  }

  getWeather(longitude, latitude) {
    const requestURL = `${this.url}forecast?lat=${latitude}&lon=${longitude}&APPID=${this.apiKey}`;
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      fetch(requestURL)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}

export default WeatherHandler;
