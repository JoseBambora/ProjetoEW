var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.jsonp({message:"Rota não definida"})
});

module.exports = router;
