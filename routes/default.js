const express = require('express');
const router = express.Router();
const controller = require('../controllers/defaultController');
const axios = require('axios');

router.get('/helloworld', async (req, res) => {
    try {
        const response = await axios.get('http://10.12.14.251/helloworld');
        res.send(response.data);
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;
