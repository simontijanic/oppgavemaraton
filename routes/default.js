const express = require('express');
const router = express.Router();
const controller = require('../controllers/defaultController');

router.get('/helloworld', controller);

module.exports = router;
