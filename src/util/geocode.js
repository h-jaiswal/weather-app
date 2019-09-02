const request = require('request')

const geocode = (queryAddress, callback) => {
    // Using the Mapbox API for forward geocoding with author's authToken
    const authToken = 'pk.eyJ1IjoiMDIwNmNzMTcxMDY1IiwiYSI6ImNrMDBsdzNhMTA2MjAzbnJ4MjVkZXZlazYifQ.yg3bA2CImOpDanCcj8dLEQ'
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + queryAddress + '.json?access_token='+encodeURIComponent(authToken);

    // Making HTTP request
    request({url: geocodeURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Mapbox API', undefined)
        } else if (response.body.features.length === 0) {
            callback('No location found. Please try more specific search terms.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode
