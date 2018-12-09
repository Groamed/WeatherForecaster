function ShowModule() {
    this.cityName = document.querySelector('.head')
    this.typeOfWeather = document.querySelector(".typeOfWeather")
    this.temperature = document.querySelector('.temperature')
    this.humidity = document.querySelector('.humidity')
    this.pressure = document.querySelector('.pressure')
    this.wind = document.querySelector('.wind')
}

ShowModule.prototype.setData = function (data) {
    this.cityName.innerHTML += data.cityname
    this.typeOfWeather.innerHTML += data.weather
    this.temperature.innerHTML += data.temp + '°C'
    this.humidity.innerHTML += data.humidity + '%'
    this.pressure.innerHTML += data.pressure + 'mmHg'
    this.wind.innerHTML += `Speed: ${data.wind.speed} m/s, degree: ${data.wind.deg}°`
}