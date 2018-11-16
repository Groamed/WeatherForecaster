var getData = function () {
    let data = {
        cityname: '',
        weather: '',
        temp: '',
        humidity: '',
        pressure: '',
        wind: { speed: '', deg: '' }
    }

    function setWeather(url) {
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
                setData(data)
            })
            .catch(error => { throw new Error(`Failed, error ${error}`) })
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let city = `https://openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b6907d289e10d714a6e88b30761fae22`
            setWeather(city)
        })
    } else {
        throw new Error('Geolocation is not avalible')
    }
}
