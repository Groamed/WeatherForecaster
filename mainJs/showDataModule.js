function showDataModule() {
    function setData(data) {
        let cityName = document.querySelector('.head')
        let typeOfWeather = document.querySelector(".typeOfWeather")
        let temperature = document.querySelector('.temperature')
        let humidity = document.querySelector('.humidity')
        let pressure = document.querySelector('.pressure')
        let wind = document.querySelector('.wind')

        cityName.innerHTML += data.cityname
        typeOfWeather.innerHTML += data.weather
        temperature.innerHTML += data.temp + '°C'
        humidity.innerHTML += data.humidity + '%'
        pressure.innerHTML += data.pressure + 'mmHg'
        wind.innerHTML += `Speed: ${data.wind.speed} m/s, degree: ${data.wind.deg}°`
    }

    return {
        setData: setData
    }
} 