var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    Rua.list()
    .then(ruas => {
        var allDatas = []
        ruas.forEach(rua => {
            allDatas = allDatas.concat(rua.datas)
        })
        sortedAllDatas = [...new Set(allDatas)].sort()
        res.render('datas',{datas:sortedAllDatas, ruas:ruas, d:d})
    })
    .catch(erro => res.render('error', {error: erro}))
});



router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    Rua.listAllDatas()
    .then(data => {
        res.render('datas',{datas:data, d:d})
    })
    .catch(erro => res.render('error', {error: erro}))
});


router.get('/data/:data', function(req,res,next){

})  

module.exports = router;
