function buscaRua(nomeRua) {
    var rua = nomeRua.replaceAll(' ', '_');
    window.location.replace('/rua/' + rua);
  }

function buscaEntidade(nomeEntidade) {
  var entidade = nomeEntidade.replaceAll(' ', '_');
  window.location.replace('/entidades/entidade/' + entidade);
}

