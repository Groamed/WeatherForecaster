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


        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(function (response) {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Failed to connect, please check you input')
                })
                .then(function (res) {
                    resolve(formData(res))
                })
                .catch(error => { reject(`Failed, error ${error}`) })
        })
    }

    function formData(rawData) {
        let data = {
            cityname: '',
            weather: '',
            temp: '',
            humidity: '',
            pressure: '',
            wind: { speed: '', deg: '' }
        }

        data.cityname = rawData.name
        data.weather = rawData.weather[0].main
        data.temp = rawData.main.temp
        data.humidity = rawData.main.humidity
        data.pressure = rawData.main.pressure
        data.wind.speed = rawData.wind.speed
        data.wind.deg = rawData.wind.deg
        return data;
    }

    return {
        getUrl: getUrl,
        getWeather: getWeather
    }
}
