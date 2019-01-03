import DataModule from './dataModule'

export default function StaticDataModule() {
    DataModule.call(this)
}

StaticDataModule.prototype = Object.create(DataModule.prototype)
StaticDataModule.prototype.constructor = StaticDataModule

StaticDataModule.prototype.getWeather = function () {
    return new Promise(function (resolve, reject) {
        fetch('../weatherFile.json')
            .then(response => {
                if (response.ok) {
                    resolve(response.json())
                }
                throw new Error('File does not exist')
            })
            .catch(error => { reject(`Failed, error ${error}`) })
    }.bind(this))
}