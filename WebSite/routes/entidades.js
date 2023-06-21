var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')


router.get('/', function(req,res,next){
    var d = new Date().toISOString().substring(0, 16)
    Rua.getEntidades()
    .then(response => {
      entidades = response.data
        res.render('entidades',{entidades:entidades,d:d})
    })
    .catch(erro => res.render('error', {error: erro,d:d}))
})


router.get('/entidade/:entidade', function(req, res, next) {
  var entity = req.params.entidade.replaceAll('_', ' ')
  var d = new Date().toISOString().substring(0, 16);
  Rua.getEntidade(entity)
  .then(response=>{
        if (response.data.length!=0){
          res.render('entidade', { entidade: response.data[0], d:d });
        }
        else{
          res.render('entidadeinvalida',{d:d}); 
        }
    })
    .catch(erro => res.render('error', { error: erro,d:d }));
});

module.exports = router;