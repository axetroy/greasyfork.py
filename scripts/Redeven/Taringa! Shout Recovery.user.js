// ==UserScript==
// @name         Taringa! Shout Recovery
// @namespace    http://www.taringa.net/redeven
// @version      1.1
// @description  Muestra shouts borrados (no incluye comentarios)
// @author       Redeven
// @include      http*://www.taringa.net/*
// @grant        GM_xmlhttpRequest
// @copyright    2017+, Redeven
// ==/UserScript==
(function() {
    'use strict';

    function parseShout(response)
    {
        if ($(response).find('#lead-notice').html() === null)
        {
            var userName = $(response).find('.object-main .user-info .nick').html();
            var userAvatar = $(response).find('.object-main .user-info img').attr('src');
            var shoutContent = $(response).find('.object-main .object-content').html();
            return '<main class="shout-item shout-item_simple shout-detail"><div class="shout-heading"><div class="shout-user"><a href="http://www.taringa.net/' + userName + '"><img class="shout-user_img og-img-user" src="' + userAvatar + '">' + userName + '</a></div></div><div class="shout-main-content clearfix image">' + shoutContent + '</div></main>';

        }
        else return $('.v6-content').html();
    }

    function recoverShout()
    {
        var pagePath = window.location.pathname;
        if (~pagePath.indexOf("/mi/"))
        {
            if ( $('#error-ng .message').html() !== null)
            {
                var archivedShout = 'https://taringo.xyz/' + pagePath.substr(pagePath.indexOf("/mi/")+4);
                GM_xmlhttpRequest({
                    method: "GET",
                    url: archivedShout,
                    onload: function(response) {
                        $('.v6-content').html(parseShout(response.responseText));
                    }
                });
            }
        }
    }

    // Ejecuta script al terminar de cargar la página
    $(document).ready(function(){
        recoverShout();
    });
})();