const router = require('express').Router();
const request = require('request');
const rp = require('request-promise');
const axios = require('axios');

require('dotenv').config();

const APPID = process.env.APPID;
const GKEY = process.env.GKEY;

router.route('/').get((req, res) => {
    res.json({
        weather: null,
        error: null
    })
})

// router.route('/').post((req, res) => {

//     // const city = req.body.city;
//     // const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APPID}`;
//     // city, unit type (imperial = fahrenheit, APPID)

//     const zip = req.body.zip;
//     const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${APPID}`;

//     request(url, (err, response, body) => {
//         if (err) {
//             res.json({
//                 weather: null,
//                 error: 'Error, please try again'
//             });
//         } else {
//             const weather = JSON.parse(body)
//             console.log(body)
//             if (weather.main == undefined) {
//                 res.json({
//                     weather: null,
//                     error: 'Error, please try again'
//                 });
//             } else {
//                 const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//                 res.json({
//                     weather: weatherText,
//                     error: null
//                 });
//             }
//         }
//     })
// });

router.route('/').post((req, res) => {
    var locationReq = {
        method: 'POST',
        uri: `https://www.googleapis.com/geolocation/v1/geolocate?key=${GKEY}`
    };

    rp(locationReq)
        .then((body) => {
            const geolocation = JSON.parse(body)
            var weatherReq = {
                method: 'POST',
                uri: `http://api.openweathermap.org/data/2.5/weather?lat=${geolocation.location.lat}&lon=${geolocation.location.lng}&units=imperial&appid=${APPID}`
            }
            console.log("sending weather request")
            return rp(weatherReq)
        })
        .then((body) => {
            const weather = JSON.parse(body)
            console.log(body)
            if (weather.main == undefined) {
                res.json({
                    weather: null,
                    error: 'Error, please try again'
                });
            } else {
                const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.json({
                    weather: weatherText,
                    error: null
                });
            }
        })
        .catch((err) => {
            res.json({
                location: {
                    lat: null,
                    lng: null
                },
                accuracy: null
            });
        })
})

module.exports = router;