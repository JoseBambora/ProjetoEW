$(function(){
    $('#btnnlugar').click(function()
    {
        event.preventDefault();
        var lugar = $('#novolugar').val()
        if(lugar.length > 0)
        {
            var line = '<li class="lugareelem">'+lugar+'</li>'
            $('#listalugares').append(line)
            $('#novolugar').val("")
        }
    })
    $('#btnndata').click(function()
    {
        event.preventDefault();
        var data = $("#novadata").val()
        if(data.length > 0)
        {
            $('#listadatas').append('<li class="dataelem">'+data+'</li>')
            $("#novadata").val("")
        }
    })
    $('#btnnentidade').click(function()
    {
        event.preventDefault();
        var entidade = $('#novaentidade').val()
        if(entidade.length > 0)
        {
            $('#listaentidades').append('<li class="entidadeelem">'+entidade+'</li>')
            $('#novaentidade').val("")
        }
    })
    $('#btnSubmitEditRua').click(function()
    {
        event.preventDefault();
        par = $("#paragrafos").val().split('\n')
        id = $("#id").val().replaceAll(' ','_')
        lug = [...$('.lugareelem')].map(e => e.innerText)
        dat = [...$('.dataelem')].map(e => e.innerText)
        ent = [...$('.entidadeelem')].map(e => { s = e.innerText.split('('); return { nome: s[0], tipo: s[1].slice(0,-1)}})
        data = {
            _id:id,
            paragrafos : par,
            lugares: lug,
            datas: dat,
            entidades: ent
        }
        console.log(data)
        send = {d: JSON.stringify(data)}
        url = 'http://localhost:7777/rua/edit/'+id
        $.post(url,send,function(response){
            window.location.href = '/rua/' + id;         
        })
    })
    $('#antigacb').click(function(){
        $('#atualcb').prop('checked', false);
        $('#antigacb').prop('checked', true);
    })

    $('#atualcb').click(function(){
        $('#atualcb').prop('checked', true);
        $('#antigacb').prop('checked', false);
    })
})