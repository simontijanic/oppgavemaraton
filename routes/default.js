const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/helloworld', async (req, res) => {
    try {
        const response = await axios.get('http://10.12.14.251/helloworld');
        res.send(response.data); 
    } catch (err) {
        console.error('Error fetching from external server:', err);
        res.status(500).json({ error: 'Unable to fetch hello world content' });
    }
});

module.exports = router;
