const router = require('express').Router();
const request = require('request');

require('dotenv').config();

const GKEY = process.env.GKEY;

router.route('/').post((req, res) => {
    
    const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${GKEY}`;
    
    request.post(url, (err, response, body) => {
        if (err) {
            res.json({
                location: {
                    lat: null,
                    lng: null
                },
                accuracy: null
            });
        } else {
            const geolocation = JSON.parse(body)
            res.json({
                location: {
                    lat: geolocation.location.lat,
                    lng: geolocation.location.lng
                },
                accuracy: geolocation.accuracy
            });
        }
    });
})

module.exports = router;