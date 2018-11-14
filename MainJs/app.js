function setWeather(url)
{
    fetch(url)
        .then(function(response) {
            if(response.ok) {
                return response.json()
            }
            throw new Error('Failed to connect, please check you input')
        })
        .then(function(res) {
            let list = document.getElementsByTagName('li')
            document.querySelector('.head').innerHTML += res.name
            list[0].innerHTML += res.weather[0].main
            list[1].innerHTML += res.main.temp + '°C'
            list[2].innerHTML += res.main.humidity + '%'
            list[3].innerHTML += res.main.pressure + 'mmHg'
            list[4].innerHTML += `Speed: ${res.wind.speed} m/s, degree: ${res.wind.deg}°`
        })
        .catch(error => {throw new Error(`Failed, error ${error}`)})
}

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        let city = `https://openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b6907d289e10d714a6e88b30761fae22`
        setWeather(city)
    })
} else {
    throw new Error('Geolocation is not avalible')
}