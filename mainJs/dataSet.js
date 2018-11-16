var setData = function (data) {
    let cityName = document.querySelector('.head')
    let listOfWeath = document.querySelectorAll(".weath > li")

    cityName.innerHTML += data.cityname
    listOfWeath[0].innerHTML += data.weather
    listOfWeath[1].innerHTML += data.temp + '°C'
    listOfWeath[2].innerHTML += data.humidity + '%'
    listOfWeath[3].innerHTML += data.pressure + 'mmHg'
    listOfWeath[4].innerHTML += `Speed: ${data.wind.speed} m/s, degree: ${data.wind.deg}°`
}