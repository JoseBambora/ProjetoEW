var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require('../models/user')
var fs = require('fs')

function verificaAutenticacao(req, res, next){
  console.log('User (verif.): ' + JSON.stringify(req.user))
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    // res.send('negado')
    res.redirect("/users/login");
  }
}

router.get('/protegida', verificaAutenticacao, 
  (req,res) => {
        //res.send('autorizado')
   			//res.send('Atingiste a área protegida!!!' + 'User: ' + JSON.stringify(req.user))
        res.render('protegida')
})

router.get('/login', function(req, res) {
  console.log('Na cb do GET login...')
  console.log(req.sessionID)
  res.render('login')
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('Na cb do POST login...')
  console.log('Auth: ' + JSON.stringify(req.user))
 	res.redirect('/users/protegida/')
})


router.get('/logout', function(req,res){
  console.log('Logout: a sair')
  req.logout(() => { return ;})
  fs.unlinkSync(__dirname + '/../sessions/' + req.sessionID + '.json')
  res.redirect('/')
})

router.get('/register', function(req,res){
  console.log('Na cb do GET register...')
  console.log(req.sessionID)
  res.render('register')
})



router.post('/register', function(req, res) {
  console.log('Na cb do POST register...')
  User.register(new User({username:req.body.username}),req.body.password, function(err,user){
    if(err)
    {
      console.log('Erro ' + err)
      return res.render('register',{user : user})
    }
    else
    {
      passport.authenticate('local')(req,res,function () {
        res.redirect('/')
      })
    }
  })
})

module.exports = router;
