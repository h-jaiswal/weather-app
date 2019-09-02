const request = require('request')

const forecast = ({latitude, longitude, location} = {}, callback) => {
    // api set so as units are acc to location and it include only currently and daily data
    const weatherURL = 'https://api.darksky.net/forecast/91bb2af7f756a69c963e0f5ce1fb3a4e/' + encodeURIComponent(latitude + ',' + longitude) + '?exclude=minutely,hourly,alerts,flags&units=auto';
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the Dark Sky Weather API.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location: ', response.body.error, undefined)
        } else {
            // callback(undefined, response.body.currently.summary + ' It is currently ' + response.body.currently.temperature + ' degrees out there at ' + location + ' and there is ' + response.body.currently.precipProbability * 100 + '% ' + 'chance of rain.')
            callback(undefined, response.body, location)
        }
    })
}

module.exports = forecast