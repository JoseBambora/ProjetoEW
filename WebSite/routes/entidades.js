var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')


router.get('/', function(req,res,next){
    var d = new Date().toISOString().substring(0, 16)
    Rua.getEntidades()
    .then(data => {
      console.log(data)
      res.render('entidades',{entidades:data,ruas:ruas,d:d})
    })
    .catch(erro => res.render('error', {error: erro,d:d}))
})


router.get('/entidade/:entidade', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var entidade = {}
  var r = []
  var f = false
  entidade["nome"] = req.params.entidade.replaceAll("_"," ")
  Rua.list()
    .then(data => {
        var ruas = data;
        for (var rua of ruas) {
          for (var e of rua.entidades) {
            const regex = new RegExp("^"+entidade["nome"]+"$", "i");
            if (e["nome"].match(regex)) {
              entidade["nome"]=e["nome"].charAt(0).toUpperCase() + e["nome"].slice(1)
              entidade["tipo"] = e["tipo"]
              r.push(rua._id.replace(" ","_"))
              f = true
              break;
            }
          }
        }
        if (f){
          res.render('entidade', { entidade: entidade, ruas: r, d:d });
        }
        else{
          res.render('entidadeinvalida',{  d:d}); 
        }
    })
    .catch(erro => res.render('error', { error: erro,d:d }));
});

module.exports = router;