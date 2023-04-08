$(function(){
    var select = false
    let expL = /\#L\d+/g
    let expD = /\#D\d+/g
    let expE = /\#E\d+/g
    let expL2 = /\#L\d+\s*\:\s*/
    let expD2 = /\#D\d+\s*\:\s*/
    let expE2 = /\#E\d+\s*\:\s*/
    let selectedlilugar = 'selectedlilugars'
    let selectedlidata = 'selectedlidata'
    let selectedlientidade = 'selectedlientidade'
    let selectedlicasa = 'selectedlicasa'
    let ee = 'entidadeelem'
    let de = 'dataelem'
    let le = 'lugareelem'
    function matchAuxiliar(join,exp)
    {
        res = join.match(exp)
        return res != undefined ? res : []
    }
    function validaInfo(data, join)
    {
        console.log(join)
        let ll = data.lugares.length
        let ld = data.datas.length
        let le = data.entidades.length
        console.log(ll)
        let il = matchAuxiliar(join,expL).map(s => Number(s.slice(2)))
        let id = matchAuxiliar(join,expD).map(s => Number(s.slice(2)))
        let ie = matchAuxiliar(join,expE).map(s => Number(s.slice(2)))
        let expl = il.filter(n => n < 0 || n >= ll).map(n => '#L' + n.toString())
        let expd = id.filter(n => n < 0 || n >= ld).map(n => '#D' + n.toString())
        let expe = ie.filter(n => n < 0 || n >= le).map(n => '#E' + n.toString())
        let erros = []
        if (expl.length > 0)
            erros.push('Indice de lugares inválidos: ' + expl.toString())
        if (expd.length > 0)
            erros.push('Indice de datas inválidos: ' + expd.toString())
        if (expe.length > 0)
            erros.push('Indice de entidades inválidos: '+ expe.toString())
        erros = erros.concat(Array.from({ length: ll }, (_, index) => index).filter(i => !il.includes(i)).map(i => 'Lugar: '    + data.lugares[i]        + ' não referenciado no texto'));
        erros = erros.concat(Array.from({ length: ld }, (_, index) => index).filter(i => !id.includes(i)).map(i => 'Data: '     + data.datas[i]          + ' não referenciada no texto'));
        erros = erros.concat(Array.from({ length: le }, (_, index) => index).filter(i => !ie.includes(i)).map(i => 'Entidade: ' + data.entidades[i].nome + ' não referenciada no texto'));
        return erros
    }

    function remove(t,atr,exp,cod)
    {
        let codigo = $('.'+t).attr('id')
        let pos = Number(codigo.slice(1))
        let cod2 = cod.slice(1)
        lug = [...$('.'+atr)]
        for(var i = pos+1; i < lug.length; i++)
        {
            $('#'+cod2+i)[0].textContent = $('#'+cod2+i)[0].textContent.replace(exp,cod+(i-1))
        }
        $('#'+codigo).remove()
    }

    function sobe(t,idt,exp)
    {
        let pos = Number($('.'+t).attr('id').slice(1))
        if(pos > 0)
        {
            console.log('A trocar de posição')
            let v1 = $('#'+idt+pos)[0].textContent
            let v2 = $('#'+idt+(pos-1))[0].textContent
            let i1 = v1.match(exp)
            let i2 = v2.match(exp)
            let old = '#'+idt+pos
            let novo = '#'+idt+(pos-1)
            $(old)[0].textContent = v2.replace(exp,i1)
            $(novo)[0].textContent = v1.replace(exp,i2)
            $(old).removeClass('w3-blue')
            $(old).removeClass(t)
            $(novo).addClass(t)
            $(novo).addClass('w3-blue')
        }
    }

    function desce(t,tid,l,exp)
    {
        if($('.'+t))
        {
            let pos = Number($('.'+t).attr('id').slice(1))
            ll = [...$('.'+l)]
            if(pos < ll.length-1)
            {
                console.log('A trocar de posição')
                let v1 = $('#'+tid+pos)[0].textContent
                let v2 = $('#'+tid+(pos+1))[0].textContent
                let i1 = v1.match(exp)
                let i2 = v2.match(exp)
                let old = '#'+tid+pos
                let novo = '#'+tid+(pos+1)
                $(old)[0].textContent = v2.replace(exp,i1)
                $(novo)[0].textContent = v1.replace(exp,i2)
                $(old).removeClass('w3-blue')
                $(old).removeClass(t)
                $(novo).addClass(t)
                $(novo).addClass('w3-blue')
            }
        }
    }

    function selectFun(t,seletor)
    {
        if(select)
        {
            $('.'+seletor).removeClass('w3-blue')
            $('.'+seletor).removeClass(seletor)
        }
        else
            select = true
        $(t).addClass(seletor)
        $(t).addClass('w3-blue')   
    }

    $('#btnnlugar').click(function()
    {
        event.preventDefault();
        var lugar = $('#novolugar').val()
        if(lugar.length > 0)
        {
            let i = [...$('.lugareelem')].length
            $('#listalugares').append('<li class="lugareelem" id="L'+i+'"> #L'+i+': ' +lugar+'</li>')
            $('#novolugar').val("")
            $('#listalugares').on('click', '.lugareelem', function() {selectFun(this, selectedlilugar);});
        
        }
    })
    $('#btnndata').click(function()
    {
        event.preventDefault();
        var data = $("#novadata").val()
        if(data.length > 0)
        {
            let i =[...$('.dataelem')].length
            $('#listadatas').append('<li class="dataelem" id="D'+i+'"> #D'+i+': '+data+'</li>')
            $("#novadata").val("")
            $('#listadatas').on('click', '.dataelem', function() {selectFun(this, selectedlidata);});
        }
    })
    $('#btnnentidade').click(function()
    {
        event.preventDefault();
        var entidade = $('#novaentidade').val()
        if(entidade.length > 0)
        {
            let i = [...$('.entidadeelem')].length
            $('#listaentidades').append('<li class="entidadeelem" id= "E'+i+'"> #E'+i+ ': '+entidade+'</li>')
            $('#novaentidade').val("")
            $('#listaentidades').on('click', '.entidadeelem', function() {selectFun(this, selectedlientidade);});
        
        }
    })
    $('#btnSubmitEditRua').click(function()
    {
        event.preventDefault();
        par = $("#paragrafos").val().split('\n')
        id = $("#id").val().replaceAll(' ','_')
        lug = [...$('.lugareelem')].map(e => e.innerText.replace(expL2,''))
        dat = [...$('.dataelem')].map(e => e.innerText.replace(expD2,''))
        ent = [...$('.entidadeelem')].map(e => { s = e.innerText.replace(expE2,'').split('('); return { nome: s[0], tipo: s[1].slice(0,-1)}})
        casas = [...$('.casaatrib')].map(c => {return {num: c.querySelector('.num').value,enfiteuta:c.querySelector('.enfiteuta').value,foro:c.querySelector('.foro').value,desc:c.querySelector('.desc').value.split('\n')}})
        console.log(casas)
        console.log(lug)
        console.log(dat)
        console.log(ent)
        data = {
            _id:id,
            paragrafos : par,
            lugares: lug,
            datas: dat,
            entidades: ent,
            casas: casas
        }
        let mensagemerro = validaInfo(data,$("#paragrafos").val() + '\n'+ casas.map(c => c.desc.join('\n')).join('\n'))
        if(mensagemerro.length == 0)
        {
            send = {d: JSON.stringify(data)}
            url = 'http://localhost:7777/rua/edit/'+id
            $.post(url,send,function(response){
                window.location.href = '/rua/' + id;         
            })
        }
        else
        {
            console.log('Erro edição')
            // Informação errada
            var mensagem = '<div class="w3-panel w3-light-grey w3-border w3-border-indigo"> <ul class="w3-ul"> <li> <h4 class= "w3-text-blue w3-margin-left" tyle="text-shadow:2px 2px 0 #444"><b>Alterações não submetidas</b </h4> </li>'
            for(let m of mensagemerro)
            {
                mensagem += '<li>'+m+'</li>'
            }
            mensagem += '</ul> </div>'
            mensagem = $(mensagem)
            $("#errodisplay").empty()
            $("#errodisplay").append(mensagem)
            $("#errodisplay").modal()
        }
    })
    $('#antigacb').click(function(){
        $('#atualcb').prop('checked', false);
        $('#antigacb').prop('checked', true);
    })

    $('#atualcb').click(function(){
        $('#atualcb').prop('checked', true);
        $('#antigacb').prop('checked', false);
    })

    $('#btnSubmitRua').click(function()
    {
        event.preventDefault();
        id = $('#id').val().replaceAll(' ','_')
        data = {
            _id:id,
            figuras_antigas: [],
            figuras_atuais: [],
            paragrafos : [],
            lugares: [],
            datas: [],
            entidades: []
        }
        console.log(data)
        send = {d: JSON.stringify(data)}
        url = 'http://localhost:7777/rua/add/'
        $.post(url,send,function(response){
            window.location.href = '/ruas/';         
        })
    })
    $('#btnLugElimina').click(function(){
        event.preventDefault();
        remove(selectedlilugar,le,/#L\d+/g,'#L')
    })
    $('#btnDatElimina').click(function(){
        event.preventDefault();
        remove(selectedlidata,de,/#D\d+/g,'#D')
    })
    $('#btnEntElimina').click(function(){
        event.preventDefault();
        remove(selectedlientidade,ee,/#E\d+/g,'#E')
    })
    $('#btnLugSobe').click(function(){
        event.preventDefault();
        sobe(selectedlilugar,'L',/#L\d+/g)
    })
    $('#btnDatSobe').click(function(){
        event.preventDefault();
        sobe(selectedlidata,'D',/#D\d+/g)  
    })
    $('#btnEntSobe').click(function(){
        event.preventDefault();
        sobe(selectedlientidade,'E',/#E\d+/g)
    })
    $('#btnLugDesce').click(function(){
        event.preventDefault();
        desce(selectedlilugar,'L',le,/#L\d+/g)
    })

    $('#btnDatDesce').click(function(){
        event.preventDefault();
        desce(selectedlidata,'D',de,/#D\d+/g)
    })

    $('#btnEntDesce').click(function(){
        event.preventDefault();
        desce(selectedlientidade,'E',ee,/#E\d+/g)
    })
    $('.lugareelem').click(function(){
        selectFun(this,selectedlilugar)
    })

    $('.dataelem').click(function(){
        selectFun(this,selectedlidata)
    })
    $('.entidadeelem').click(function(){
        selectFun(this,selectedlientidade)
    })
    $('.casaatrib').click(function(){
        selectFun(this,selectedlicasa)
    })
    $('#btnncasa').click(function(){
        event.preventDefault();
        var casanum = $('#novacasa').val()
        if(casanum.length > 0)
        {
            pnum = '<p> Número: <input class="w3-input w3-border w3-border-indigo num" type="text" value='+casanum+' readonly></input></p>'
            penf = '<p> Enfiteuta: <input class="w3-input w3-border w3-border-indigo enfiteuta" type="text"></input></p>'
            pfor = '<p> Foro: <input class="w3-input w3-border w3-border-indigo foro" type="text"></input></p>'
            pdes = '<p> Descrição:<input class="w3-input w3-border w3-border-indigo desc" type="text"></input></p>'
            elem = '<div class="w3-panel w3-leftbar w3-border-blue">'+pnum+penf+pfor+pdes+'</div>'
            $('#listacasas').append('<li class="casaatrib w3-bar">'+elem+'</li>')
            $('#novacasa').val("")
            $('#listacasas').on('click', '.casaatrib', function() {selectFun(this, selectedlicasa);});
        
        }
    })
    $('#btnCasaElimina').click(function(){
        event.preventDefault();
        $('.'+selectedlicasa).remove()
    })
})