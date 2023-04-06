var express = require('express');
var router = express.Router();

router.get('/imagem/:imagem', function(req, res, next) {
    im = __dirname+'/../../Data/imagem/'+req.params.imagem
    console.log(im)
    res.download(im)
})


router.get('/atual/:imagem', function(req, res, next) {
    im = __dirname+'/../../Data/atual/'+req.params.imagem
    console.log(im)
    res.download(im)
})

router.get('/entitytypes/:imagem', function(req, res, next) {
    im = __dirname+'/../../Data/entitytypes/'+req.params.imagem
    console.log(im)
    res.download(im)
})


module.exports = router;