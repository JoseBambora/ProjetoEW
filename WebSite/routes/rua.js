var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

function getRua(req,res)
{
    var d = new Date().toISOString().substring(0, 16)
    d = d.replace('T', ' ')
    Rua.getRua(req.params.idrua)
    .then(data => 
        {
        if (data)
        {
            r = Rua.formatParagraphRua(data)
            res.render('rua',{ rua: r, d:d, nome_rua: r._id.replaceAll('_',' ')}); 
        }
        else
        {
            res.render('ruainvalida',{  d:d}); 
        }
        console.log('Página rua ' + req.params.idrua)
        })
    .catch(erro => res.render('error', {error: erro, d:d}))
}

router.get('/:idrua', function(req, res, next) {
    getRua(req,res)
});

router.get('/edit/:idrua', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    d = d.replace('T', ' ')
    Rua.getRua(req.params.idrua)
    .then(data => 
        {
        texto = data.paragrafos.join('\n')
        res.render('ruaedit',{ rua: data, d:d, nome_rua: data._id.replaceAll('_',' '), texto: texto}); 
        console.log('Página edit rua ' + req.params.idrua)
        })
    .catch(erro => res.render('error', {error: erro, d:d}))
});

router.post('/edit/:idrua',function(req,res,next){
    Rua.getRua(req.params.idrua)
    .then(data => {
        data.paragrafos = req.body.paragrafos.split('\n')
        console.log(data)
        Rua.updateRua(data)
        .then(_ => { getRua(req,res)})
        .catch(erro => res.render('error', {error: erro, d:d}))
    })
    .catch(erro => res.render('error', {error: erro, d:d}))

 
})

module.exports = router;
