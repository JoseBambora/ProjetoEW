var express = require('express');
var router = express.Router();
var env = require('../config/env')
var axios = require('axios')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function(req,res){
  r = ''
  e = ''
  if(req.query.rota)
    r = req.query.rota
  if(req.cookies.erro)
  {
    e = 'Credenciais erradas'
    res.clearCookie('erro')
  }
  res.render('loginForm',{rota: r, erro: e})
})

router.get('/register',function(req,res){
  r = ''
  e = ''
  if(req.query.rota)
    r = req.query.rota
  if(req.cookies.erro)
  {
    e = 'Erro ao registar utilizador'
    res.clearCookie('erro')
  }
  res.render('registerForm',{rota: r, erro: e})
})


router.post('/login', function(req,res){
  axios.post(env.userlogin,req.body)
  .then(response => {
    res.cookie('token',response.data.token)
    if(req.query.rota)
      res.redirect(req.query.rota)
    else
      res.redirect("/")
    // res.json({token: response.data})
  })
  .catch(erro => {res.cookie('erro',true); res.redirect('/users/login/')})
})

router.post('/register', function(req,res){
  console.log(req.body)
  axios.post(env.userregister,req.body)
  .then(response => {
    res.cookie('token',response.data.token)
    if(req.query.rota)
      res.redirect(req.query.rota)
    else
      res.redirect("/")
  })
  .catch(erro => {res.cookie('erro',true); res.redirect('/users/register/')})
})

module.exports = router;
