let weatherSet = weatherModule()

weatherSet.getUrl()
    .then(function (url) {
        return weatherSet.getWeather(url)
    })
    .then(function (data) {
        weatherSet.setData(data)
    })
    .catch(error => { throw new Error(error) })