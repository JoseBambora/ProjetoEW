const Rua = require('../models/rua')
const axios = require('axios')
const Env = require('../config/env')

module.exports.list = () => {
    return axios.get(Env.ruas)
    .then(data => { return data.data })
    .catch(erro => {return erro})
}

module.exports.getRua = (id) => {
    return axios.get(Env.rua+id)
    .then(data => { return data.data })
    .catch(erro => {return erro}) 
}


module.exports.getRuaOriginal = (id) => {
    return axios.get(Env.ruaoriginal+id)
    .then(data => { return data.data })
    .catch(erro => {return erro}) 
}


module.exports.insertRua = rua => {
    return axios.put(Env.ruas,rua)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}


module.exports.updateRua = rua => {
    return axios.post(Env.rua+rua._id,rua)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

module.exports.updateFieldsRua = (id,dados) => {
    return axios.post(Env.ruaFields+id,dados)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

module.exports.updateFiguraRua = (id,dados) => {
    return axios.post(Env.ruaFiguras+id,dados)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}


module.exports.deleteRua = id => {
    return axios.delete(Env.rua+id)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}
 
module.exports.getNomeEntidades = () => {
    return axios.get(Env.entidadenome)
    .then(dados => { return dados.data })
    .catch(erro => { return erro })
}
  
module.exports.getEntidades = () => {
    return axios.get(Env.entidades)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}