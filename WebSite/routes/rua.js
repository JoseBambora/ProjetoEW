var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/:idrua', function(req, res, next) {
  Rua.getRua(req.params.idrua)
  .then(data => res.json(Rua.formatParagraphRua(data)))
  .catch(erro => res.json(erro))
});

router.post('/edit/:id',function(req,res,next){
  
})

module.exports = router;
