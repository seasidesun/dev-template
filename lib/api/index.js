'use strict';

var router = require('express').Router();

router.get('/apps', function (req, res) {res.json({list: []})});

module.exports = router;
