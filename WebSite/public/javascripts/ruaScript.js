$(function(){
    let ncasas = casas = $('#listacasasul li').length
    var casas = []
    var indice = -1
    let numcasas = 3
    var fotoAntiga = -1
    var fotoAtual = -1
    let nfoantiga = $('.img-antiga').length-1
    let nfoatual = $('.img-atual').length-1
    function manipulaFotos(string, variavel,avanca,num,cmp, idlabel)
    {
        if(num > -1 && ((avanca && variavel < num) || (!avanca && cmp != 0)))
        {
            var idfoto = string + variavel
            if (variavel != -1)
                $(idfoto).prop('style',"display:none;")
            if (avanca)
                variavel+=1
            else
                variavel-=1
            idfoto = string + variavel
            $(idlabel)[0].innerText = "Foto "+ (variavel+1) +" de " + (num+1)
            $(idfoto).prop('style',"")
        }
        return variavel
    }

    function avancaFotoAntiga(){fotoAntiga = manipulaFotos('#fant',fotoAntiga,true,nfoantiga,fotoAntiga,"#indexant")}
    function recuaFotoAntiga(){ fotoAntiga = manipulaFotos('#fant',fotoAntiga,false,nfoantiga,fotoAntiga,"#indexant")}
    function avancaFotoAtual(){ fotoAtual  = manipulaFotos('#fatu',fotoAtual,true,nfoatual,fotoAtual,"#indexatu")}
    function recuaFotoAtual(){  fotoAtual  = manipulaFotos('#fatu',fotoAtual,false,nfoatual,fotoAtual,"#indexatu")}

    function loadcasas()
    {
        aux = []
        for(var i = 0; i < ncasas; i++)
        {
            aux.push('#casa'+i)
            if(i % numcasas == numcasas-1)
            {
                casas.push(aux)
                aux = []
            }
        }
        if(aux.length > 0)
        {
            casas.push(aux)
        }
        paginas = Math.ceil(casas.length)
    }
    function applyStyleHouse(index,aux)
    {
        for(var casa of casas[index])
        {
            $(casa).prop('style',aux)
        }
    }
    function showNHouses(index)
    {
        var res = indice
        if(index >= 0 && index < casas.length)
        {
            if(indice > -1)
                applyStyleHouse(indice,"display:none;")
            applyStyleHouse(index,"")
            $('#nrPaginasCasas')[0].innerText = "Página "+ (index+1) +" de " + casas.length
            res = index
        }
        return res
    }
    function showMoreHouses()
    {
        indice = showNHouses(indice+1)
    }
    function showLessHouses()
    {
        indice = showNHouses(indice-1)
    }
    function euclidianDistance(latcenter, loncenter,r)
    {
        return Math.sqrt(Math.pow(latcenter-r.lat,2)+Math.pow(loncenter-r.lon,2))
    }
    function getMapa()
    {
        let streetname = $('#nome_rua')[0].textContent
        const countryname = 'Portugal'
        const cityname = 'Braga';
        const query = `${streetname},${cityname}, ${cityname}, ${countryname}`;
        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => 
        {
            if (xhr.status === 200) 
            {
                const response = JSON.parse(xhr.responseText);
                if (response.length > 0) 
                {
                    let latcenter = 41.54988, loncenter = -8.42682
                    // console.log(response)
                    response.sort((r1,r2) => euclidianDistance(latcenter,loncenter,r1) - euclidianDistance(latcenter,loncenter,r2))
                    const lat = response[0].lat;
                    const lon = response[0].lon;
                    $('#linkrua1').attr("href",`https://www.openstreetmap.org/#map=17/${lat}/${lon}`);
                    $('#linkrua2').attr("href",`https://www.openstreetmap.org/#map=17/${lat}/${lon}`);
                }
            }
        };
        xhr.send();
    }

    function initFun()
    {
        if ($('#nome_rua').length)
        {
            avancaFotoAtual()
            avancaFotoAntiga()
            loadcasas()
            getMapa()
            showMoreHouses()
        }
    }
    
    initFun()
    $('#antigacb').click(function(){
        $('#atualcb').prop('checked', false);
        $('#antigacb').prop('checked', true);
    })

    $('#atualcb').click(function(){
        $('#atualcb').prop('checked', true);
        $('#antigacb').prop('checked', false);
    })
    $('#mostrarmaiscasas').click(function(){
        event.preventDefault();
        showMoreHouses()
    })
    $('#mostrarmenoscasas').click(function(){
        event.preventDefault();
        showLessHouses()
    })
    $('#proximafotoantiga').click(function(){
        event.preventDefault();
        avancaFotoAntiga()
    })
    $('#anteriorfotoantiga').click(function(){
        event.preventDefault();
        recuaFotoAntiga()
    })
    $('#proximafotoatual').click(function(){
        event.preventDefault();
        avancaFotoAtual()
    })
    $('#anteriorfotoatual').click(function(){
        event.preventDefault();
        recuaFotoAtual()
    })
})