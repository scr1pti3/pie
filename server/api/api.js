const express = require('express');
const panel = require('./panel');
const router = express.Router();

router.use('/panels', panel);
//router.use('/section', section);

module.exports = router;
