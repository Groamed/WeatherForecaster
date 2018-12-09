const weatherShow = new ShowModule()
let weatherGet

if (navigator.onLine) {
    weatherGet = new HttpDataModule()

} else {
    weatherGet = new StaticDataModule()
}

weatherGet.getUrl()
    .then(() => {
        weatherGet.getWeather()
            .then(res => {
                return weatherGet.formData(res)
            })
            .then(data => {
                weatherShow.setData(data)
            })
            .catch(error => { throw new Error(error) })
    })
    .catch(error => { throw new Error(error) })