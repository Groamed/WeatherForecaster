function DataModule() {
    this.url = ''
    this.data = {
        cityname: '',
        weather: '',
        temp: '',
        humidity: '',
        pressure: '',
        wind: { speed: '', deg: '' }
    }
}

DataModule.prototype.formData = function (rawData) {
    this.data.cityname = rawData.name
    this.data.weather = rawData.weather[0].main
    this.data.temp = rawData.main.temp
    this.data.humidity = rawData.main.humidity
    this.data.pressure = rawData.main.pressure
    this.data.wind.speed = rawData.wind.speed
    this.data.wind.deg = rawData.wind.deg
    return this.data
}

DataModule.prototype.getUrl = function () {
    return new Promise(function (resolve, reject) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let city = `https://openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b6907d289e10d714a6e88b30761fae22`
                this.url = city
                resolve()
            })
        } else {
            resolve('Geolocation is not avalible')
        }
    })
}