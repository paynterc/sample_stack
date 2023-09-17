var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send([
{
  "life_form": "Wolf spiders",
  "w1": 2,
  "w2": 2,
  "w3": 2,
  "w4": 2,
  "w5": 2,
  "w6": 2,
  "w7": 2,
  "w8": 2,
},
{
  "life_form": "Crickets",
  "w1": 5,
  "w2": 5,
  "w3": 5,
  "w4": 5,
  "w5": 5,
  "w6": 5,
  "w7": 5,
  "w8": 5,
},
{
  "life_form": "Aphids",
  "w1": 5,
  "w2": 5,
  "w3": 5,
  "w4": 5,
  "w5": 5,
  "w6": 5,
  "w7": 5,
  "w8": 5,
}
,
{
  "life_form": "Milkweed",
  "w1": 5,
  "w2": 5,
  "w3": 5,
  "w4": 5,
  "w5": 5,
  "w6": 5,
  "w7": 5,
  "w8": 5,
}
]);
});

module.exports = router;
