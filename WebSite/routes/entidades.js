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
      entidades = Array.from(entidades).map(str => str.charAt(0).toUpperCase() + str.slice(1)).sort();
      entidades = [...new Set(entidades)];
      res.render('entidades',{entidades:entidades,ruas:ruas,d:d})
    })
    .catch(erro => res.render('error', {error: erro,d:d}))
})


router.get('/entidade/:entidade', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    var entidade = {}
    var r = []
    entidade["nome"] = req.params.entidade.replaceAll("_"," ")
    Rua.list()
      .then(data => {
        var ruas = data;
        for (var rua of ruas) {
          for (var e of rua.entidades) {
            const regex = new RegExp(entidade["nome"], "i");
            if (e["nome"].match(regex)) {
              entidade["tipo"] = e["tipo"]
              r.push(rua._id.replace("-"," "))
              break;
            }
          }
        }
        res.render('entidade', { entidade: entidade, ruas: r, d:d });
      })
      .catch(erro => res.render('error', { error: erro,d:d }));
  });


module.exports = router;