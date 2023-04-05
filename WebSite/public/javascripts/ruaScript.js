$(function(){
    $('#btnnlugar').click(function()
    {
        event.preventDefault();
        var lugar = $('#novolugar').val()
        var line = '<li><a href="/">'+lugar+'</a></li>'
        $('#listalugares').append(line)
        $('#novolugar').val("")
        console.log(line)
    })
    $('#btnndata').click(function()
    {
        event.preventDefault();
        var data = $("#novadata").val()
        $('#listadatas').append('<li><a>'+data+'</a></li>')
        $("#novadata").val("")
        console.log(data)
    })
    $('#btnnentidade').click(function()
    {
        event.preventDefault();
        var entidade = $('#novaentidade').val()
        $('#listaentidades').append('<li><a>'+entidade+'</a></li>')
        $('#novaentidade').val("")
        console.log(entidade)
    })
})