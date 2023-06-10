var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')
var multer = require('multer')
var auth = require('../auth/auth')
var upload = multer({dest:'uploads'})
var fs = require('fs')

function getDate()
{
    var d = new Date().toISOString().substring(0, 16)
    d = d.replace('T', ' ')
    return d
}

function getRuaForm(req,res,next){
    var d = getDate()
    res.render('ruaform',{d:d})
}

function createRua(req,res,next){
    var d = getDate()
    let name = req.body.nome.replaceAll(' ', '_')
    let obj = {
        _id:name,
        figuras_antigas: [],
        figuras_atuais: [],
        paragrafos : [],
        lugares: [],
        datas: [],
        entidades: []
    }
    Rua.insertRua(obj)
    .then(data => { res.redirect('/rua/'+name)})
    .catch(erro => res.render('error', {error: erro, d:d}))
}

function getRua(req,res)
{
    var d = getDate()
    Rua.getRua(req.params.idrua)
    .then(data => 
    {
        if (data && !data.error)
        {
            r = data
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


function getRuaEdit(req,res,next)
{
    var d = getDate()
    Rua.getRuaOriginal(req.params.idrua)
    .then(data => 
    {
        texto = data.paragrafos.join('\n')
        res.render('ruaedit',{ rua: data, d:d, nome_rua: data._id.replaceAll('_',' '), texto: texto}); 
        console.log('Página edit rua ' + req.params.idrua)
    })
    .catch(erro => res.render('error', {error: erro, d:d}))
}

function postRuaEdit(req,res,next)
{
    var d = getDate()
    console.log('Post edit ' +req.params.idrua)
    var data = JSON.parse(req.body.d)
    Rua.updateFieldsRua(req.params.idrua,data)
    .then(data => 
    {
        res.redirect('/rua/'+req.params.idrua)
    })
    .catch(erro => res.render('error', {error: erro, d:d}))
}

function getFotosEdit(req,res,next)
{
    var d = getDate()
    Rua.getRua(req.params.idrua)
    .then(data => {res.render('uploadimg',{ rua: data, d:d, nome_rua: data._id.replaceAll('_',' ')})})
    .catch(erro => res.render('error', {error: erro, d:d}))
}


function getPaths(req)
{
    let oldPath = __dirname + '/../' + req.file.path
    var pat = '/images/imagem/'+ req.file.originalname
    if (req.body.epoca=='atual')
        pat = '/images/atual/'+req.file.originalname
    let newPath = __dirname + '/../public/' + pat
    console.log('cdir: ' + __dirname)
    console.log('old: '  + oldPath)
    console.log('new: '  + newPath)
    return [oldPath, newPath, pat]
}

function postFotosEdit(req,res,next)
{
    var d = getDate()
    gp = getPaths(req)
    oldPath = gp[0]
    newPath = gp[1]
    pat = gp[2]
    data = {epoca: req.body.epoca, path:pat, legenda: req.body.desc}
    fs.rename(oldPath,newPath, erro => { if(erro) throw erro })
    Rua.updateFiguraRua(req.params.idrua,data)
    .then(data => { res.redirect('/rua/'+req.params.idrua)})
    .catch(erro => res.render('error', {error: erro, d:d}))
}

function deleteRua(req,res,next)
{
    console.log('entrou')
    Rua.deleteRua(req.params.idrua)
    .then(data => {res.redirect('/ruas/')})
    .catch(erro => res.render('error', {error: erro, d:d}))
}


function getDeleteRua(req,res,next)
{
    res.render('ruadelete',{id:req.params.idrua})
}

function protegidas(req,res,next,fun,rota)
{
    auth.verificaAcesso(req)
    .then(valido => {
        if (valido) fun(req,res,next); 
        else res.redirect('/users/login?rota='+rota);
    })
    .catch(_ => res.redirect('/users/login?rota='+rota))
}


router.get('/add/', (req, res, next)=>{
    protegidas(req,res,next,getRuaForm,'/rua/add/')
})
router.post("/add/", (req, res, next)=>{
    protegidas(req,res,next,createRua,'/rua/add/')
})
router.get('/:idrua', function(req, res, next) {
    getRua(req,res)
});

router.get('/edit/:idrua', function(req, res, next) {
    protegidas(req,res,next,getRuaEdit,'/rua/edit/'+req.params.idrua)
});

router.post('/edit/:idrua',function(req,res,next){
    protegidas(req,res,next,postRuaEdit,'/rua/edit/'+req.params.idrua)
})

router.get('/fotos/:idrua',function(req,res,next){
    protegidas(req,res,next,getFotosEdit,'/rua/fotos/'+req.params.idrua)
})

router.post("/fotos/:idrua",upload.single('myfile'), (req, res,next)=>{
    protegidas(req,res,next,postFotosEdit,'/rua/fotos/'+req.params.idrua)
})

router.post("/delete/:idrua", function(req, res, next) {
    protegidas(req,res,next,deleteRua,'/rua/'+req.params.idrua)
});

router.get("/delete/:idrua",function(req,res,next){
    protegidas(req,res,next,getDeleteRua,'/rua/delete/'+req.params.idrua)
})

module.exports = router;
