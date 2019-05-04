// ==UserScript==
// @name         autolike v2
// @namespace    
// @version      2.02
// @description  script sencillo que da likes y no te abre la casilla rapida de comentario
// @author       @macrigatou
// @match        https://www.taringa.net/mi
// @grant        none
// ==/UserScript==

(function() {
    function autolike() {
        if($("#Feed-reload").css("display") == "block"){
            $("#Feed-reload").click();
        }
    $( "div" ).removeClass( "quick-reply" );
    $(".s-like").click();
    }
   setInterval(autolike, 1500);
})();