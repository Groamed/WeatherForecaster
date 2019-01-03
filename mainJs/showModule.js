export default function ShowModule() {
    this.seach = document.querySelector('.seach-block')
    this.cityInput = document.querySelector('.city-input')
    this.weather = document.querySelector('.weather-block')
    this.cityName = document.querySelector('.city-head')
    this.typeOfWeather = document.querySelector(".typeOfWeather")
    this.temperature = document.querySelector('.temperature')
    this.humidity = document.querySelector('.humidity')
    this.pressure = document.querySelector('.pressure')
    this.wind = document.querySelector('.wind')
}

ShowModule.prototype.setData = function (data) {
    this.seach.style.top = '0px'
    this.cityName.innerHTML = 'City Name: ' + data.cityname
    this.typeOfWeather.innerHTML = 'Weather: ' + data.weather
    this.temperature.innerHTML = 'Middle Temperature: ' + data.temp + '°C'
    this.humidity.innerHTML = 'Humidity: ' + data.humidity + '%'
    this.pressure.innerHTML = 'Pressure: ' + data.pressure + 'mmHg'
    this.wind.innerHTML = `Wind: Speed: ${data.wind.speed} m/s, degree: ${data.wind.deg}°`
}

ShowModule.prototype.setSugList = function (inputValue) {
    if (inputValue === '') {
        return
    }
    let suggestions = []
    fetch('./countries.json')
        .then(json => json.json())
        .then(res => {
            for (let index in res.arr) {
                if (res.arr[index].toLowerCase().startsWith(inputValue)) {
                    if (suggestions.includes(res.arr[index])) {
                        continue;
                    }
                    suggestions.push(res.arr[index])
                }
                if (suggestions.length === 5) {
                    break;
                }
            }
            if (document.querySelector('.suggest')) {
                document.querySelector('.suggest').remove()
            }
            let suglist = document.createElement('div')
            suglist.className = 'suggest'
            for (let i = 0; i < suggestions.length; i++) {
                let option = document.createElement('div')
                option.className = 'sugOption'
                option.innerHTML = suggestions[i]
                suglist.append(option)
            }
            suglist.addEventListener('click', event => {
                this.cityInput.value = event.target.innerHTML
                document.querySelector('.suggest').remove()
            })
            this.seach.append(suglist)
            console.log(suggestions)
        })
}