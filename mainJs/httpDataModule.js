function HttpDataModule() {
    DataModule.call(this)
}

HttpDataModule.prototype = Object.create(DataModule.prototype)
HttpDataModule.prototype.constructor = HttpDataModule

HttpDataModule.prototype.getWeather = function () {
    return new Promise(function (resolve, reject) {
        fetch(this.url)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed to connect, please check you input')
            })
            .then(function (res) {
                resolve(res)
            })
            .catch(error => { reject(`Failed, error ${error}`) })
    })
}