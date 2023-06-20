var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    Rua.getDatas()
    .then(response => res.render('datas', {dates:response, d:d}))
    .catch(erro => res.render('error', {error:erro}))
});

router.get('/data/:data', function(req, res, next) {
    var dateRes = req.params.data.replaceAll('_', ' ')
    var d = new Date().toISOString().substring(0, 16)
    Rua.getData(dateRes)
    .then(response => {
        if (response.length != 0){
            res.render('data', {date:dateRes, streets:response[0].ruas, d:d});
        }
        else{
            res.render('dataInvalida',{d:d}); 
        }})
    .catch(erro => res.render('error', {error:erro}))
});

module.exports = router;
