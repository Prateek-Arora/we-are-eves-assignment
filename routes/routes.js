const express = require("express");
const axios = require('axios');
const router = express.Router();
const NodeCache = require( "node-cache" );
const config = require('../config/config');

module.exports = router;

// Initializing a memory cache with expiration at 1hr
const myCache = new NodeCache({stdTTL: 3600});


// API function for /retrieve-reviews endpoint
const retrieveReviews = async (req, res) => {

    // query params for external API
    const brandId = '18f2b6df-a8a6-4910-af97-9f9a12a6c66a';
    const idType = 'BARCODE';
    const embedId = '0000050671304';
    const country = 'NL';
    const language = 'nl';

    try{
        if(myCache.has('reviews')){
            res.send(myCache.get('reviews'));
        }
        const resp = await axios.get(`${config.baseUrl}?brandId=${brandId}&idType=${idType}&embedId=${embedId}&country=${country}&language=${language}&API_KEY=${config.APIKey}`)
        myCache.set('reviews', resp.data.reviews);
        res.send(resp.data.reviews);
    }
    catch(err) {
        res.status(err.response.status).send(err.response.data)
    }
}

router.get('/retrieve-reviews', retrieveReviews);