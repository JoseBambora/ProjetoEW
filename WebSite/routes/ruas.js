var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/', function(req, res, next) {
  Rua.list()
  .then(data => res.json(Rua.formatParagraphRuas(data)))
  .catch(erro => res.json(erro))
});

router.get('/data/:data', function(req,res,next){

})

router.get('/entidade/:entidade', function(req,res,next){
  
})

router.get('/datas', function(req,res,next){

})

router.get('/entidades', function(req,res,next){
  
})

router.post('/',function(req,res,next){
  
})

module.exports = router;
