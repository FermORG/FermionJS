getWeather(e){
  e.preventDefault();
  const xhr = new XMLHttpRequest;
  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=33.9720&lon=118.4266&APPID=926e656e6a87160a6ab07d4187839529'),
  xhr.send();

 xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
     this.setState({
        weatherData: this.parseWeather(xhr.response),
      });
   }
  }
}@

parseWeather(data) {
  const weather = JSON.parse(data);
  const description = weather.weather[0].description;
  const tempF = Math.round(weather.main.temp *9/5 - 460);
  return {
    description,
    tempF,
  };
}@