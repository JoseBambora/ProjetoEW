var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

/* GET home page. */
router.get('/', function(req, res, next) {
  // Página inicial
  Rua.list()
  .then(data => res.json(Rua.formatParagraphRuas(data)))
  .catch(erro => res.json(erro))
})

module.exports = router;
