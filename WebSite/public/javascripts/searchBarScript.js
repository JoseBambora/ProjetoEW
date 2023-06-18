function buscaRua(nomeRua) {
    var rua = nomeRua.replaceAll(' ', '_');
    window.location.href='/rua/' + rua;
  }

function buscaEntidade(nomeEntidade) {
  var entidade = nomeEntidade.replaceAll(' ', '_');
  window.location.href='/entidades/entidade/' + entidade;
}

function buscaData(nomeData) {
  var entidade = nomeData.replaceAll(' ', '_');
  window.location.href='/datas/data/' + entidade;
}

