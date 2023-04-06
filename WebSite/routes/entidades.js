var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')


router.get('/', function(req,res,next){
    var d = new Date().toISOString().substring(0, 16)
    Rua.list()
    .then(data => {
      ruas = data
      entidades = []
      for(var rua of ruas){
        const entityNames = rua.entidades.map(entity => entity.nome);
        entidades = entidades.concat(entityNames);
    }
      entidades = [...new Set(entidades)];
      entidades = Array.from(entidades).map(str => str.charAt(0).toUpperCase() + str.slice(1)).sort();
      res.render('entidades',{entidades:entidades,ruas:ruas})
    })
    .catch(erro => res.render('error', {error: erro}))
})


router.get('/entidade/:entidade', function(req,res,next){
  
})


module.exports = router;