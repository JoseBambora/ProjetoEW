var express = require('express');
var router = express.Router();

router.get('/imagem/:imagem', function(req, res, next) {
    im = __dirname+'/../../Data/imagem/'+req.params.imagem
    console.log(im)
    res.sendFile(im)
})


router.get('/atual/:imagem', function(req, res, next) {
    im = __dirname+'/../../Data/atual/'+req.params.imagem
    console.log(im)
    res.sendFile(im)
})
module.exports = router;