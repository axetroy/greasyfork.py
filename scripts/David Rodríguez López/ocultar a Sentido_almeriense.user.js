// ==UserScript==
// @name         ocultar a Sentido_almeriense
// @namespace    http://tampermonkey.net/
// @version      1.1
// @author       baldboy
// @description ocultar posts de Sentido_almeriense
// @match        http://udalmeriasad.mforos.com/*
// ==/UserScript==


$(document).ready(function() {
  if ( $( "table#ForoMensajes" ) ) {
    var busca = $("a:contains('Sentido_almeriense')");
    var padre = $(busca).parent();
    $(padre).parent().css("display","none");
  }
});