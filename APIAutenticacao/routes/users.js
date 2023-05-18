var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require('../models/user')
var CUser = require('../controllers/user')
var auth = require('../auth/auth')
var jwt = require('jsonwebtoken')

function createUser(req)
{
  return new User({
    username : req.body.username,
    email: req.body.email,
    birth_date: req.body.birth_date,
    address: req.body.address,
    creation_date: new Date().toISOString().substring(0,19)
  })
}

function createtoken(req,res)
{
  jwt.sign({ username: req.user.username, 
    sub: 'novo utilizador RuasBraga'}, 
    "RuasBragaEW",
    {expiresIn: 3600},
    function(e, token) 
    {
      if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      else res.status(201).jsonp({token: token})
    });
}

function posRegister (err, user,res,req) {
  if (err) 
    res.jsonp({error: err, message: "Register error: " + err})
  else
  {
    passport.authenticate("local")(req,res,function()
    {
      createtoken(req,res)
    })
  }
}     

router.post('/register', function(req, res) {
  console.log('Na cb do POST register...')
  // console.log(req.body)
  // res.jsonp({message:'boas'})
  User.register(createUser(req),req.body.password, function(err, user) {posRegister(err,user,res,req)})
})

router.put('/:id/password', auth.verificaAcesso, function(req, res) {
  CUser.updateUserPassword(req.params.id, req.body)
    .then(dados => {res.jsonp(dados)})
    .catch(erro => {res.jsonp({error: erro, message: "Erro na alteração do utilizador"})})
})
  
router.post('/login', passport.authenticate('local'), function(req, res){
  createtoken(req,res)
})

router.get('/verifytoken',auth.verificaAcesso, function(req, res) {
  res.jsonp({validade:true})
})

module.exports = router;
