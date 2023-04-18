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

function updateOld(id,path,legenda)
{
    return Rua.updateOne({_id : id},{$push:{ 'figuras_antigas':{path:path,legenda:legenda}}})
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

function updateNew(id,path,legenda)
{
    return Rua.updateOne({_id : id},{$push:{ 'figuras_atuais':{path:path,legenda:legenda}}})
    .then(dados => { return dados })
    .catch(erro => { return erro })
}

module.exports.updateFigurasRua = (id,dados) => {
    let legenda = dados.legenda
    let path = dados.path
    let epoca = dados.epoca
    if(epoca == 'figuras_atuais')
        return updateNew(id,path,legenda)
    else
        return updateOld(id,path,legenda)

}

module.exports.updateFieldsRua = (id,dados) => {
    let par = dados.paragrafos
    let dat = dados.datas
    let lug = dados.lugares
    let ent = dados.entidades
    let ca = dados.casas
    return Rua.updateOne({_id : id},{$set :{paragrafos:par,datas:dat,lugares:lug,entidades:ent,casas:ca}})
    .then(dados => { console.log('Rua atualizada'); return dados })
    .catch(erro => { return erro })
}


module.exports.deleteRua = id => {
    return Rua.deleteOne({_id: id})
}
 
module.exports.getNomeEntidades = () => {
    return this.list()
      .then(data => {
        ruas = data
        entidades = []
        for(var rua of ruas){
          const entityNames = rua.entidades.map(entity => entity.nome);
          entidades = entidades.concat(entityNames);
        }
        entidades = Array.from(entidades).map(str => str.charAt(0).toUpperCase() + str.slice(1)).sort();
        entidades = [...new Set(entidades)];
        return entidades
      })
      .catch(erro => {
        throw erro;
      })
  }
  
  module.exports.getEntidades = () => {
    return this.list()
      .then(data => {
        ruas = data
        entidades = []
        for(var rua of ruas){
          for(entidade of rua.entidades){
            e={}
            e["nome"] = entidade["nome"].charAt(0).toUpperCase() + entidade["nome"].slice(1)
            e["tipo"] = entidade["tipo"]
            if(!entidades.some(x => x.nome === e.nome)){
                entidades.push(e)
            }
          }
        }
        entidades.sort((a, b) => a.nome.localeCompare(b.nome))
        return entidades
      })
      .catch(erro => {
        throw erro;
      })
  }