const weatherGet = getDataModule()
const weatherShow = showDataModule()

weatherGet.getUrl()
    .then(function (url) {
        return weatherGet.getWeather(url)
    })
    .then(function (data) {
        weatherShow.setData(data)
    })
    .catch(error => { throw new Error(error) })