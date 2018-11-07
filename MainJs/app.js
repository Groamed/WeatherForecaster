let cityweather = {
    name: '',
    temperature: '',
    humidity: '',
    wind: ''
}

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
            
            cityweather.name = res.name
            cityweather.temperature = res.main.temp
            cityweather.humidity = res.main.humidity
            cityweather.wind = res.wind
            document.getElementsByClassName('head')[0].innerHTML += cityweather.name
            let list = document.getElementsByTagName('li')
            list[0].innerHTML += cityweather.temperature
            list[1].innerHTML += cityweather.humidity
            list[2].innerHTML += `Speed: ${cityweather.wind.speed}, degree: ${cityweather.wind.deg}`
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