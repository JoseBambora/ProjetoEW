function buscaRua(nomeRua) {
    var rua = nomeRua.replaceAll(' ', '_');
    window.location.replace('/rua/' + rua);
  }

  function buscaEntidade(nomeEntidade) {
    var rua = nomeEntidade.replaceAll(' ', '_');
    window.location.replace('/entidades/entidade/' + rua);
  }

