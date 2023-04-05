var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/:idrua', function(req, res, next) {
  // Rua.getRua(req.params.idrua)
  // .then(data => res.json(Rua.formatParagraphRua(data)))
  // .catch(erro => res.json(erro))
  var d = new Date().toISOString().substring(0, 16)
  d = d.replace('T', ' ')
  Rua.getRua(req.params.idrua)
  .then(data => 
    {
      r = Rua.formatParagraphRua(data)
      res.render('rua',{ rua: r, d:d, nome_rua: r._id.replaceAll('_',' ')}); 
      console.log('Página rua ' + req.params.idrua)
    })
  .catch(erro => res.render('error', {error: erro, d:d}))
});

router.post('/edit/:id',function(req,res,next){
  
})

module.exports = router;
