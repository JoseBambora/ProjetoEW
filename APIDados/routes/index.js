var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

/* GET home page. */
router.get('/ruas/', function(req, res, next) {
  Rua.list()
  .then(data => res.jsonp(Rua.formatParagraphRuas(data)))
  .catch(error => res.jsonp({error:error}))
});

router.get('/rua/:id', function(req, res, next) {
  Rua.getRua(req.params.id)
  .then(data => res.jsonp(Rua.formatParagraphRua(data)))
  .catch(error => res.jsonp({error:error}))
});

router.get('/rua/original/:id', function(req, res, next) {
  Rua.getRua(req.params.id)
  .then(data => res.jsonp(data))
  .catch(error => res.jsonp({error:error}))
});

router.post('/rua/:id', function(req, res, next) {
  Rua.updateRua(req.body)
  .then(data => res.jsonp(data))
  .catch(error => res.jsonp({error:error}))
});

router.post('/rua/fields/:id', function(req, res, next) {
  Rua.updateFieldsRua(req.params.id,req.body)
  .then(data => res.json(data))
  .catch(error => res.jsonp({error:error}))
});

router.post('/rua/figures/:id', function(req, res, next) {
  Rua.updateFigurasRua(req.params.id,req.body)
  .then(data => res.json(data))
  .catch(error => res.jsonp({error:error}))
});

router.put('/ruas/', function(req, res, next) {
  Rua.insertRua(req.body,req.query.username)
  .then(data => res.jsonp(data))
  .catch(error => res.jsonp({error:error}))
});

router.delete('/rua/:id', function(req, res, next) {
  Rua.deleteRua(req.params.id)
  .then(data => res.jsonp(data))
  .catch(error => res.jsonp({error:error}))
});

router.get('/entidades/', function(req, res, next) {
  Rua.getEntidades()
  .then(data => res.jsonp(data))
  .catch(error => res.jsonp({error:error}))
});

router.get('/entidades/:id', function(req, res, next) {
  Rua.getEntidade(req.params.id)
  .then(data => res.jsonp(data))
  .catch(error => res.jsonp({error:error}))
});

module.exports = router;
