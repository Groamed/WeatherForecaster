function ShowModule() {
    this.seach = document.querySelector('.seach-block')
    this.weather = document.querySelector('.weather-block')
    this.cityName = document.querySelector('.city-head')
    this.typeOfWeather = document.querySelector(".typeOfWeather")
    this.temperature = document.querySelector('.temperature')
    this.humidity = document.querySelector('.humidity')
    this.pressure = document.querySelector('.pressure')
    this.wind = document.querySelector('.wind')
}

ShowModule.prototype.setData = function (data) {
    this.seach.style.top = '0px'
    this.cityName.innerHTML = 'City Name: ' + data.cityname
    this.typeOfWeather.innerHTML = 'Weather: ' + data.weather
    this.temperature.innerHTML = 'Middle Temperature: ' + data.temp + '°C'
    this.humidity.innerHTML = 'Humidity: ' + data.humidity + '%'
    this.pressure.innerHTML = 'Pressure: ' + data.pressure + 'mmHg'
    this.wind.innerHTML = `Wind: Speed: ${data.wind.speed} m/s, degree: ${data.wind.deg}°`
}