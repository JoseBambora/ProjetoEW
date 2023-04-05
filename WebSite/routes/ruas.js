var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  Rua.list()
  .then(data => {
    ruas = Rua.formatParagraphRuas(data)
    res.render('ruas',{ruas:ruas,d:d})
  })
  .catch(erro => res.render('error', {error: erro}))
});

router.get('/data/:data', function(req,res,next){

})

router.get('/entidade/:entidade', function(req,res,next){
  
})

router.get('/datas', function(req,res,next){

})

router.get('/entidades', function(req,res,next){
  
})

module.exports = router;
