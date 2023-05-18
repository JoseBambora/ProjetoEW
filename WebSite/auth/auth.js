var env = require('../config/env')
var axios = require('axios')

module.exports.verificaAcesso = function (req){
    var myToken = ( req.cookies && req.cookies.token ) || req.query.token || req.body.token
    return axios.get(env.verifytoken+'?token='+myToken)
    .then(response => {return response.data.validade})
    .catch(error => {return false})
}