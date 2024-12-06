const express = require('express');
const router = express.Router();

router.get('/helloworld', async (req, res) => {
    try {
        res.redirect(`http://10.12.14.251/helloworld`)
    } catch (err) {
        console.log(errr);
    }
});

module.exports = router;
