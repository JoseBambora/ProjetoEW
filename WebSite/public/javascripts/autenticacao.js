$(function(){
    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
      
        for (var i = 0; i < cookieArray.length; i++) {
          var cookie = cookieArray[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
          }
          if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
          }
        }
        return null;
      }
      
    $('#logout').click(function(){
        event.preventDefault();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/' ;     
    })
    function setWidthDefaultBtn(width)
    {
      str = 'width:'+width+'%'
      $('#homehref').prop('style',str)
      $('#ruashref').prop('style',str)
      $('#datashref').prop('style',str)
      $('#entidadeshref').prop('style',str)
    }
    function init()
    {
        let token = getCookie('token')
        if(token)
        {
            $('#logout').prop('style','width:20%')
            $('#login').prop('style',"display:none;")
            $('#register').prop('style',"display:none;")
            setWidthDefaultBtn(20)
        }
        else
        {
            $('#logout').prop('style',"display:none;")
            $('#login').prop('style','width:16.6%')
            $('#register').prop('style','width:16.6%')
            setWidthDefaultBtn(16.6)
        }
    }
    init()
})