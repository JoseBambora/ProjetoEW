const Rua = require('../models/rua')

function formatRua(rua) {
    parares = []
    datas = rua.datas
    entidades = rua.entidades
    lugares = rua.lugares
    pars = rua.paragrafos
    for(var par of pars)
    {
        sub = par
        ml = []
        me = []
        md = []
        if (par.includes('#L'))
            ml = par.matchAll(/\#L\d+/g)
        if (par.includes('#E')) 
            me = par.matchAll(/\#E\d+/g)
        if (par.includes('#D')) 
            md = par.matchAll(/\#D\d+/g) 
        for(var l of ml)
        {
            l = l[0]
            sub = sub.replace(l,lugares[Number(l.slice(2))])
        }
        for(var e of me)
        {
            e = e[0]
            sub = sub.replace(e,entidades[Number(e.slice(2))].nome)
        }
        for(var d of md)
        {
            d = d[0]
            sub = sub.replace(d,datas[Number(d.slice(2))])
        }
        parares.push(sub)
    }
    rua.paragrafos = parares
    rua.lugares = [...new Set(rua.lugares)].sort()
    rua.datas = [...new Set(rua.datas)].sort()
    rua.entidades = rua.entidades.sort((e1,e2) => e1.nome.localeCompare(e2.nome))
    return rua
}

module.exports.formatParagraphRua = (rua) =>
{
    return formatRua(rua)
}

module.exports.formatParagraphRuas = (ruas) =>
{
    res = []
    for(var r of ruas)
    {
        rua = formatRua(r)
        res.push(rua)   
    }
    return res
}

module.exports.list = () => {
    return Rua.find()
    .then(data => { return data })
    .catch(erro => {return erro})
}

module.exports.getRua = (id) => {
    return Rua.findOne({_id: id})
    .then(data => { return data })
    .catch(erro => {return erro}) 
}

module.exports.insertRua = rua => {
    return Rua.create(rua)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}


module.exports.updateRua = rua => {
    return Rua.updateOne({_id : rua._id},rua)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}


module.exports.deleteRua = id => {
    return Rua.deleteOne({_id: id})
}
 

