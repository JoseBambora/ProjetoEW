var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  Rua.list()
  .then(data => {
    res.render('ruas',{ruas:data,d:d})
  })
  .catch(erro => res.render('error', {error: erro,d:d}))
});


module.exports = router;
