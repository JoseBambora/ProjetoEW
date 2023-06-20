const e = require('express')
const Rua = require('../models/rua')

function formatAux(pars,lugares,datas,entidades)
{
    parares = []
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
    return parares
}

function formatRua(rua) {
    rua.entidades = rua.entidades.sort((e1,e2) => e1.nome.localeCompare(e2.nome))
    datas = rua.datas
    entidades = rua.entidades
    lugares = rua.lugares
    pars = rua.paragrafos
    rua.paragrafos = formatAux(pars,lugares,datas,entidades)
    for(var c of rua.casas)
    {
        c.desc = formatAux(c.desc,lugares,datas,entidades)
    }
    rua.lugares = [...new Set(rua.lugares)].sort()
    rua.datas = [...new Set(rua.datas)].sort()
    rua.entidades = rua.entidades.sort((e1,e2) => e1.nome.localeCompare(e2.nome))
    return rua
}

function formatUpdate(username,msg)
{
    return {
        username: username,
        message: msg,
        date: new Date().toISOString().substring(0, 10)
    }
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
    return Rua.find().sort({_id:1})
    .then(data => { return data })
    .catch(erro => {return erro})
}

module.exports.getRua = (id) => {
    return Rua.findOne({_id: id})
    .then(data => { return data })
    .catch(erro => {return erro}) 
}

module.exports.insertRua = (rua,username) => {
    rua.updates = [formatUpdate(username,'Criação da rua')]
    return Rua.create(rua)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}


module.exports.updateRua = rua => {
    return Rua.updateOne({_id : rua._id},rua)
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

function updateOld(id,path,legenda,username)
{
    let msg = formatUpdate(username, 'Adicionou uma nova imagem antiga')
    return Rua.updateOne({_id : id},{$push:{ 'figuras_antigas':{path:path,legenda:legenda}, 'updates':msg}})
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

function updateNew(id,path,legenda,username)
{
    let msg = formatUpdate(username, 'Adicionou uma nova imagem atual')
    return Rua.updateOne({_id : id},{$push:{ 'figuras_atuais':{path:path,legenda:legenda}, 'updates':msg}})
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

module.exports.updateFigurasRua = (id,dados) => {
    let legenda = dados.legenda
    let path = dados.path
    let epoca = dados.epoca
    let username = dados.username
    if(epoca == 'figuras_atuais')
        return updateNew(id,path,legenda,username)
    else
        return updateOld(id,path,legenda,username)

}

module.exports.updateFieldsRua = (id,dados) => {
    let par = dados.paragrafos
    let dat = dados.datas
    let lug = dados.lugares
    let ent = dados.entidades
    let ca = dados.casas
    let username = dados.username
    let msg = formatUpdate(username, 'Atualizou dados da ruas')
    return Rua.updateOne({_id : id},{
        $push: {'updates': msg}, 
        $set :{paragrafos:par,datas:dat,lugares:lug,entidades:ent,casas:ca}})
    .then(dados => { console.log('Rua atualizada'); return dados })
    .catch(erro => { return erro })
}


module.exports.deleteRua = id => {
    return Rua.deleteOne({_id: id})
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

module.exports.getEntidades = () => {
    return Rua.aggregate([{$project:{_id:1,entidades:1}},{$unwind:"$entidades"}])
    .then(data => {
        const entidades = data.map(e => ({rua:e._id, nome: (e.entidades.nome.charAt(0).toUpperCase() + e.entidades.nome.slice(1)), tipo: e.entidades.tipo }))
        const entidadesNomes = entidades.map(e=>({nome:e.nome,tipo:e.tipo}))
        const uniqueEntidades = entidadesNomes.reduce((acc, cur) => {
            const found = acc.find(obj => obj.nome === cur.nome);
            if (!found) {
              acc.push(cur);
            }
            return acc;
          }, []);
        const result = uniqueEntidades.map(eNome => ({nome:eNome.nome,tipo:eNome.tipo,ruas:entidades.filter(e=>e.nome.localeCompare(eNome.nome)==0).map(e=>e.rua.replaceAll('_',' '))}))
        result.sort((a, b) => a.nome.localeCompare(b.nome))
        return result;
    })
    .catch(erro => {
        throw erro;
    })
}

module.exports.getEntidade = entidade => {
    return this.getEntidades()
    .then(dados => {return dados.filter(e=>e.nome===entidade)})
    .catch(erro => { return erro })
}

module.exports.getDatas = () => {
    return Rua.aggregate([{$project:{_id:1,datas:1}},{$unwind:"$datas"}])
    .then(data => {
        const uniqueDatas = [...new Set(data.map(e => e.datas))]
        const result = uniqueDatas.map(d => ({data:d,ruas: data.filter(e=>e.datas === d).map(e=>e._id.replaceAll('_',' '))}))
        result.sort((a, b) => a.data.localeCompare(b.data))
        return result;
    })
    .catch(erro => {
        throw erro;
    })
}

module.exports.getData = data => {
    return this.getDatas()
    .then(dados => {return dados.filter(e=>e.data===data)})
    .catch(erro => { return erro })
}

