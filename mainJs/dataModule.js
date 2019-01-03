export default function DataModule() {
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
    if (document.querySelector('.suggest')) {
        document.querySelector('.suggest').remove()
    }
    this.data.cityname = rawData.name
    this.data.weather = rawData.weather[0].main
    this.data.temp = rawData.main.temp
    this.data.humidity = rawData.main.humidity
    this.data.pressure = rawData.main.pressure
    this.data.wind.speed = rawData.wind.speed
    this.data.wind.deg = rawData.wind.deg
    return this.data
}