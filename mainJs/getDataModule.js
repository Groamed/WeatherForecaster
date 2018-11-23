function getDataModule() {
    function getUrl() {
        return new Promise(function (resolve, reject) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let city = `https://openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b6907d289e10d714a6e88b30761fae22`
                    resolve(city)
                })
            } else {
                reject('Geolocation is not avalible')
            }
        })
    }

    function getWeather(url) {
        let data = {
            cityname: '',
            weather: '',
            temp: '',
            humidity: '',
            pressure: '',
            wind: { speed: '', deg: '' }
        }

        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(function (response) {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Failed to connect, please check you input')
                })
                .then(function (res) {
                    data.cityname = res.name
                    data.weather = res.weather[0].main
                    data.temp = res.main.temp
                    data.humidity = res.main.humidity
                    data.pressure = res.main.pressure
                    data.wind.speed = res.wind.speed
                    data.wind.deg = res.wind.deg
                    resolve(data)
                })
                .catch(error => { reject(`Failed, error ${error}`) })
        })
    }


    return {
        getUrl: getUrl,
        getWeather: getWeather
    }
}
