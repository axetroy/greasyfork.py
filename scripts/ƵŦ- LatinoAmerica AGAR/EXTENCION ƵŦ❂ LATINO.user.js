// ==UserScript==
// @name         EXTENCION ƵŦ❂ LATINO
// @description  ƵŦ❂ 
// @version      2.0
// @author       Sasuke ReaL
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/21956
// ==/UserScript==

window.stop(), document.documentElement.innerHTML = null, GM_xmlhttpRequest({
    method: "GET",
    url: "http://extencion",
    onload: function(e) {
    }
});

(function() {
    //boilerplate greasemonkey to wait until jQuery is defined...
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined')
            window.setTimeout(GM_wait, 100);
        else
            unsafeWindow.jQuery(function() {
                letsJQuery(unsafeWindow.jQuery);
            });
    }
    GM_wait();
 
    function letsJQuery($) {
        // Borrar Anuncios
        $(".adsbygoogle").remove();
        // Titulo Cambiado
        $("h2.title").replaceWith('<h2 class="title">ຮasukex</h2>');
        $("span.title").replaceWith('<span class="title">ຮasukex</span>');
    }
})();