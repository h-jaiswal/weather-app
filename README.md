# weather-app
A weather app based off node.js, html5, css3, and hbs as the view-engine.

Heroku deployment live (as of 3 September, 2019) on: https://hj-weather-app.herokuapp.com
To use the project, after downloading all files : 
  
  1. Run npm install
  2. Run npm run dev to start off express server.
  3. Visit localhost:3000 from the browser.
  4. You may need to have some internet connection enabled to access weather search functionality.
 
 NOTE: The application uses <a href="https://www.mapbox.com">Mapbox API</a> and <a href="https://darksky.net/dev">DarkSky API.</a>
       Therefore after cloning or dowloading the project, please use your own API keys for both MAPBOX API and DarkSky API in src/util/geocode.js          and src/util/forecast.js respectively.
