const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Harshit Jaiswal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Harshit Jaiswal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Harshit Jaiswal'
    })
})

// Route handler to serve up JSON
app.get('/weather/', (req, res) => {
    if( !req.query.address ) {
        return res.send('Please provide some address as query string')
    }

    const address = req.query.address
    geocode( address, (error, response) => {
        if (error) {
            return res.render('404', {
                title: 'Error! Sweet Jesus',
                author: 'Harshit Jaiswal',
                errorMessage: error
            })
        } else {
            forecast(response, (error, response, location) => {
                if (error) {
                    return res.render('404', {
                        title: 'Error! Sweet Jesus',
                        author: 'Harshit Jaiswal',
                        errorMessage: error
                    })
                } else {
                    return res.send({
                        forecast: response.daily.data[0].summary + ' It is currently ' +  response.currently.temperature + ' degrees out there and it\'s a ' + response.currently.precipProbability * 100 + '% chance of rain.',
                        query: address,
                        location: location
                    })
                }
            })
        }
    })
})

app.get('/api/weather/', (req, res) => {
    if( !req.query.address ) {
        return res.send({
            error: 'Please provide some location.'
        })
    }
    const address = req.query.address
    geocode( address, (error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(response, (error, response, location) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    return res.send({
                        forecast: response.daily.data[0].summary + ' It is currently ' +  response.currently.temperature + ' degrees out there and it\'s a ' + response.currently.precipProbability * 100 + '% chance of rain.',
                        query: address,
                        location: location
                    })
                }
            })
        }
    })
})
// Route handler for error pages, * is a wild card character for anything
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harshit Jaiswal',
        errorMessage: 'Help index not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Harshit Jaiswal',
        errorMessage: 'Page not found'
    })
})

app.listen( port, () => {
    console.log('The server is up and running at port ' + port + ' on localhost')
})