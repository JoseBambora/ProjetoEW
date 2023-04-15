var mongoose = require('mongoose')

var figuraSchema = new mongoose.Schema({
    path: String,
    legenda: String
})

var entidadeSchema = new mongoose.Schema({
    nome: String,
    tipo: String
})

var casaSchema = new mongoose.Schema({
    num: String,
    enfiteuta: String,
    foro: String,
    desc: [String]
})

var ruaSchema = new mongoose.Schema({
    _id : String,
    figuras_antigas: [figuraSchema],
    figuras_atuais: [figuraSchema],
    paragrafos: [String],
    datas: [String],
    lugares: [String],
    entidades: [entidadeSchema],
    casas: [casaSchema]
    
})

module.exports = mongoose.model('rua',ruaSchema)