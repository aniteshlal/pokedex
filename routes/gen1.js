var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /gen1 route.');
});

module.exports = router;