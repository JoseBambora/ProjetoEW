var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')
var multer = require('multer')
var upload = multer({dest:'uploads'})
var fs = require('fs')


function getDate()
{
    var d = new Date().toISOString().substring(0, 16)
    d = d.replace('T', ' ')
    return d
}




router.get('/add/', (req, res, next)=>{
    var d = getDate()
    res.render('ruaform',{d:d})
})

router.post("/add/", (req, res, next)=>{
    var d = getDate()
    request = JSON.parse(req.body.d)
    Rua.insertRua(request)
    .then(data => 
    {
        res.redirect('/ruas/')
    })
    .catch(erro => res.render('error', {error: erro, d:d}))

})

function getRua(req,res)
{
    var d = getDate()
    Rua.getRua(req.params.idrua)
    .then(data => 
    {
        if (data)
        {
            r = Rua.formatParagraphRua(data)
            fwan = 100 / r.figuras_antigas.length
            fwat = 100 / r.figuras_atuais.length
            res.render('rua',{ rua: r, d:d, nome_rua: r._id.replaceAll('_',' '), fwan: fwan, fwat: fwat}); 
        }
        else
        {
            res.render('ruainvalida',{  d:d}); 
        }
        console.log('Página rua ' + req.params.idrua)
    })
    .catch(erro => res.render('error', {error: erro, d:d}))
}

function updateRua(data, d,res)
{
    Rua.updateRua(data)
    .then(_ => { console.log('Rua atualizada'); res.redirect('/rua/'+req.params.idrua)})
    .catch(erro => res.render('error', {error: erro, d:d}))
}

router.get('/:idrua', function(req, res, next) {
    getRua(req,res)
});

router.get('/edit/:idrua', function(req, res, next) {
    var d = getDate()
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
    var d = getDate()
    console.log('Post edit ' +req.params.idrua)
    Rua.getRua(req.params.idrua)
    .then(data => 
    {
        request = JSON.parse(req.body.d)
        data.paragrafos = request.paragrafos
        data.lugares = request.lugares
        console.log(request.lugares)
        data.datas = request.datas
        data.entidades = request.entidades
        updateRua(data,d,res)
    })
    .catch(erro => res.render('error', {error: erro, d:d}))
})

router.get('/fotos/:idrua',function(req,res,next){
    var d = getDate()
    Rua.getRua(req.params.idrua)
    .then(data => {res.render('uploadimg',{ rua: data, d:d, nome_rua: data._id.replaceAll('_',' ')})})
    .catch(erro => res.render('error', {error: erro, d:d}))
})

function getPaths(req)
{
    let oldPath = __dirname + '/../' + req.file.path
    var pat = '/Data/imagem/'+ req.file.originalname
    if (req.body.epoca=='atual')
        pat = '/Data/atual/'+req.file.originalname
    let newPath = __dirname + '/../..' + pat
    console.log('cdir: ' + __dirname)
    console.log('old: '  + oldPath)
    console.log('new: '  + newPath)
    return [oldPath, newPath, pat]
}

router.post("/fotos/:idrua", upload.single('myfile'), (req, res)=>{
    var d = getDate()
    gp = getPaths(req)
    oldPath = gp[0]
    newPath = gp[1]
    pat = gp[2]
    fs.rename(oldPath,newPath, erro => { if(erro) throw erro })
    Rua.getRua(req.params.idrua)
    .then(data => 
    {
        if (req.body.epoca=='atual')
            data.figuras_atuais.push({path:pat, legenda: req.body.desc})
        else
            data.figuras_antigas.push({path:pat, legenda: req.body.desc})
        updateRua(data,d)    
    })
    .catch(erro => res.render('error', {error: erro, d:d}))
})

module.exports = router;
