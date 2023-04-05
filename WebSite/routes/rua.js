var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/:idrua', function(req, res, next) {
  // Rua.getRua(req.params.idrua)
  // .then(data => res.json(Rua.formatParagraphRua(data)))
  // .catch(erro => res.json(erro))
  Rua.getRua(req.params.idrua)
  .then(data => 
    {
      r = Rua.formatParagraphRua(data) 
      // r.figuras_antigas.map(f => { f.path = __dirname+'..'+f.path, f.legenda})
      // r.figuras_atuais.map(f => { f.path = __dirname+'..'+f.path, f.legenda})
      res.render('rua',{ rua: r}); 
      console.log('Página rua ' + req.params.idrua)
    })
  .catch(erro => res.render('error', {error: erro}))
});

router.post('/edit/:id',function(req,res,next){
  
})

module.exports = router;
