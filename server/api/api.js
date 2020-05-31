const express = require('express');
const panel = require('./panel');
const router = express.Router();

router.use('/panel', panel);
//router.use('/section', section);

module.exports = router;
