import DataModule from './dataModule'

export default function HttpDataModule() {
    DataModule.call(this)
    this.url = ''
    this.city = document.querySelector('.city-input')
}

HttpDataModule.prototype = Object.create(DataModule.prototype)
HttpDataModule.prototype.constructor = HttpDataModule

HttpDataModule.prototype.getWeather = function () {
    return new Promise(function (resolve, reject) {
        fetch(this.url)
            .then(response => {
                if (response.ok) {
                    resolve(response.json())
                }
                throw new Error('Failed to connect, please check you input')
            })
            .catch(error => { reject(`Failed, error ${error}`) })
    }.bind(this))
}

HttpDataModule.prototype.setGeoUrl = function () {
    return new Promise(function (resolve, reject) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.url = `https://openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b6907d289e10d714a6e88b30761fae22`
                resolve(true)

            }, () => {
                resolve(false)
            })
        } else {
            resolve(false)
        }
    }.bind(this))
}

HttpDataModule.prototype.setInputUrl = function () {
    if (this.city.value !== '')
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.value}&units=metric&appid=930c1bbbbba989e24dd29e39a50af455`
}