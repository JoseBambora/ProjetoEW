var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')


router.get('/', function(req,res,next){
    var d = new Date().toISOString().substring(0, 16)
    console.log("ola")
    Rua.list()
    .then(data => {
      ruas = Rua.formatParagraphRuas(data)
      entidades = []
      for(var rua of ruas){
        eRua = rua.entidades
        for (var e in eRua){
            if(!(e in entidades)) entidades.push(e)}
      }
      console.log(entidades)
      res.render('entidades',{entidades:entidades})
    })
    .catch(erro => res.render('error', {error: erro}))
})


router.get('/entidade/:entidade', function(req,res,next){
  
})


module.exports = router;