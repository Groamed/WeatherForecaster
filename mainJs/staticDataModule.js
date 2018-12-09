function StaticDataModule() {
    DataModule.call(this)
}

StaticDataModule.prototype = Object.create(DataModule.prototype)
StaticDataModule.prototype.constructor = StaticDataModule

StaticDataModule.prototype.getWeather = function () {
    return new Promise(function (resolve, reject) {
        fetch('../weatherFile.json')
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('File does not exist')
            })
            .then(function (res) {
                resolve(res)
            })
            .catch(error => { reject(`Failed, error ${error}`) })
    })
}