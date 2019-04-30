const express = require('express'),
    app = express(),
    path = require('path'),
    request = require('request'),
    bodyParser = require('body-parser');

// configuration for running application within corporate network
// change proxy flag value to TRUE with correspong proxyAddress value
// for running it within corporate network
proxyFlag = process.env.proxyFlag || false;
proxyAddress = 'http://10.201.51.101:8080';

// body parsers for application/json 
app.use(express.json({
    limit: '50mb'
}));
app.use(bodyParser.json());


// statically hosting front end code
app.use(express.static('dist/openWeather'));


// request to fetch data from openWeather map
app.post('/getData', function (req, res) {
    console.log('in get data api', req.body);
    let options = {
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${req.body.lat}&lon=${req.body.long}&appid=f5f7c182f4a8850365de9575b191124b&units=metric`,
        method: "GET",
    }
    if(proxyFlag) {
        options.proxy = proxyAddress;
    }
    console.log('weather data options: ', options)
    request(options, function (error, response, body) {
        // console.log(response)
        // console.log("body-------weather data-------" + JSON.stringify(body));
        res.status(200).send(body);
    });
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    console.log('******************************************', req.url);
    res.sendFile('dist/openWeather/index.html', {
        root: 'dist'
    });
});

// configuring port for express server
let port = process.env.PORT || '5000';

app.listen(port, function () {
    console.log("node server started on port " + port);
});
