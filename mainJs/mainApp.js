const weatherShow = new ShowModule()
const weatherGet = navigator.onLine ? new HttpDataModule() : new StaticDataModule()
let ready = false;
const suggestions = debounce(cities, 1000)

weatherShow.seach.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        weatherGet.setInputUrl()
        weatherGet.getWeather()
            .then(res => weatherGet.formData(res))
            .then(data => weatherShow.setData(data))
            .catch(error => { throw new Error(error) })
    } else {
        suggestions(event.target.value)
    }
})

ymaps.ready(() => {
    ready = true;
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

function debounce(func, time) {
    let id
    return function (...arg) {
        if (id) {
            clearTimeout(id)
        }

        id = setTimeout(() => {
            func.apply(this, arg)
            id = null
        }, time)
    }
}

function cities(text) {
    if (text === '') {
        return
    }
    if (ready) {
        ymaps.suggest(text, { provider: 'yandex#search' })
            .then(items => {
                if (document.querySelector('#sug')) {
                    document.querySelector('#sug').remove()
                }
                let datalist = document.createElement('datalist')
                items.forEach(el => {
                    let option = document.createElement('option')
                    option.value = el.displayName.split(',')[0]
                    datalist.append(option)
                });
                datalist.id = 'sug'
                document.body.append(datalist)
            })
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