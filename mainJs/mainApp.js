import ShowModule from './showModule'
import HttpDataModule from './httpDataModule'
import StaticDataModule from './staticDataModule'

const weatherShow = new ShowModule()
const weatherGet = navigator.onLine ? new HttpDataModule() : new StaticDataModule()
const suggestions = debounce(weatherShow.setSugList, 1000, weatherShow)

weatherShow.seach.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        weatherGet.setInputUrl()
        weatherGet.getWeather()
            .then(res => weatherGet.formData(res))
            .then(data => weatherShow.setData(data))
            .catch(error => { throw new Error(error) })

    }
})

weatherShow.seach.addEventListener('keyup', event => {
    if (!(event.code === 'Enter')) {
        suggestions(weatherShow.cityInput.value.toLowerCase())
    }
})

weatherShow.seach.addEventListener('click', event => {
    weatherShow.weather.style.right = '100%'
    weatherShow.weather.style.opacity = '0'
    weatherShow.seach.style.top = '100px'
})

weatherShow.seach.addEventListener('transitionend', event => {
    if (event.target.style.top === '0px' && event.propertyName === 'top') {
        weatherShow.weather.style.right = '0%'
        weatherShow.weather.style.opacity = '1'
    }
})

function debounce(func, time, that) {
    let id
    return function (...arg) {
        if (id) {
            clearTimeout(id)
        }

        id = setTimeout(() => {
            func.apply(that, arg)
            id = null
        }, time)
    }
}

weatherGet.setGeoUrl()
    .then(bool => {
        if (bool) {
            return weatherGet.getWeather()
        } else {
            throw new Error('Geolocation rejected')
        }
    })
    .then(res => weatherGet.formData(res))
    .then(data => weatherShow.setData(data))
    .catch(error => { throw new Error(error) })