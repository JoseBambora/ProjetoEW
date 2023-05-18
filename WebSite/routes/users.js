var express = require('express');
var router = express.Router();
var env = require('../config/env')
var axios = require('axios')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function(req,res){
  res.render('loginForm')
})

router.get('/register',function(req,res){
  res.render('registerForm')
})


router.post('/login', function(req,res){
  axios.post(env.userlogin,req.body)
  .then(response => {
    console.log(response.data)
    res.cookie('token',response.data.token)
    res.redirect("/")
    // res.json({token: response.data})
  })
  .catch(erro => res.json({error: erro}))
})

router.post('/register', function(req,res){
  console.log(req.body)
  axios.post(env.userregister,req.body)
  .then(response => {
    console.log(response.data)
    res.cookie('token',response.data.token)
    res.redirect("/")
  })
  .catch(erro => res.json({error: erro}))
})

module.exports = router;
