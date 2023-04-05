function buscaRua(nomeRua) {
    var rua = nomeRua.replaceAll(' ', '_');
    window.location.replace('/rua/' + rua);
  }

