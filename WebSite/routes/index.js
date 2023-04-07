var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

/* GET home page. 
router.get('/', function(req, res, next) {
  // Página inicial
  Rua.list()
  .then(data => res.json(Rua.formatParagraphRuas(data)))
  .catch(erro => res.json(erro))
})
*/

router.get('/', function(req, res, next) {
  // Página inicial
  var d = new Date().toISOString().substring(0, 16)
  Rua.list()
  .then(data => res.render('index',{d:d}))
  .catch(erro => res.json(erro))
})

module.exports = router;
