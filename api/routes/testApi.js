var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly. This response comes from a Node/Express API running on port 9000 locally.');
});

module.exports = router;
