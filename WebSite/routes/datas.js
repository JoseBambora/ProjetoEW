var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    Rua.list()
        .then(streets => {
            var dates = []
            for (var street of streets){
                for (var date of street.datas){
                    dates.push(date)
                }
            }
            res.render('datas', {dates:dates, streets:streets, d:d})
        })
        .catch(erro => {
            res.render('error', {error:erro})
        })
});

router.get('/data/:data', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var dateRes = req.params.data.replaceAll('_', ' ')
    var streetsRes = []
    var flag = false
    Rua.list()
        .then(streets => {
            for (var street of streets){
                for (var date of street.datas){
                    if (date === dateRes){
                        streetsRes.push(street._id.replace(" ", "_"))
                        flag = true
                        break
                    }
                }
            }
            if (flag){
                res.render('data', {date:dateRes, streets:streetsRes, d:d});
            }
            else{
                res.render('dataInvalida',{d:d}); 
            }
        })
        .catch(erro => {
            res.render('error', {error:erro, d:d});
        })
});

module.exports = router;
