// ==UserScript==
// @name         Extension Clan ʍт ?|Private Extension
// @namespace    Private Extension
// @version      3.0
// @description  Edition Ogario
// @author       m0nster
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==
 
// Copyright © 2016 ogario.ovh
 
if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/Clanʍт ?" + location.hash;
    return;
}
 
var ogarioJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.js?v=212" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.sniff.js?v=212"></script>';
var ogarioCSS = '<link href="http://ogario.ovh/download/v21/ogario.v2.css?v=212" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
 
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + "</body>");
    return _page;
}
 
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        nuevoScript();
        document.close();
    }
});
 
function nuevoScript() {
    window.onload = function() {
        inicio();
    }
}
 
function inicio() {
    document.title = "Clan ʍт ❥";
    modificarTextoMinimapa("By m0nster");
    modificarTextoLeaderboard("Clan ʍт ❥");
    modificarCanalYoutube("Suscribanse al canal", "UC52JW6d475jx7izciHkfZCA");
    modificarFooter("My Channel", "https://www.youtube.com/channel/UCA44vvjrIrl_RvWj6CkJiJQ");
    panelDerecho();
    ocultarBotonAdelante();
    ocultarBotonAtras();
    redondearPanelCentral("20");
    redondearPanelDerecho("20");
    modificarMargenesPanel("10");
    redondearControles();
    colorPanelCentral("#400A85");
    colorPanelDerecho("#660466");
    colorTextoPestaña("#FF0013");
    colorPestañaActiva("#09D56C");
 
    colorBotonPlay("#C40B65", "#1565C0");
    bordeBotonPlay("#088D3C", "#069E9E");
 
    colorBotonLoginAndPlay("#2E7D32", "#069E9E");
    bordeBotonLoginAndPlay("#C2CF04", "#D80B0B");
 
    colorBotonLogout("#C62828", "#A70898");
    bordeBotonLogout("#1908A7", "#C62828");
 
    colorBotonFacebook("#3071a9", "#3071a9");
    bordeBotonFacebook("#3071a9", "#3071a9");
 
    colorBotonGoogle("#D34C3D", "#D34C3D");
    bordeBotonGoogle("#D34C3D", "#D34C3D");
 
    colorBotonSpectate("#FF8F00", "#A3540B");
    bordeBotonSpectate("#B7A406", "#B7A406");
 
    colorBotonCopy("#1565C0", "#088E55");
    bordeBotonCopy("#088D3C", "#1565C0");
 
    colorBotonCreate("#069E9E", "#2E7D32");
    bordeBotonCreate("#C2CF04", "#D80B0B");
 
    colorBotonJoin("#C40B65", "#1565C0");
    bordeBotonJoin("#2E7D32", "#069E9E");
 
    colorBotonStreamMode("#078E54", "#400A85");
 
    colorBotonHideUrl("#078E54", "#400A85");
 
    colorBotonFreeCoins("#5cb85c", "#400A85");
    bordeBotonFreeCoins("#5cb85c", "#398439");
 
    colorBotonShop("#ff7900", "#400A85");
    bordeBotonShop("#ff7900", "#954700");
 
 
    colorBotonResetHotkeys("#1565C0", "#2F2F2A");
    bordeBotonResetHotkeys("#1565C0", "#1565C0");
 
    colorBotonSaveHotkeys("#2E7D32", "#2F2F2A");
    bordeBotonSaveHotkeys("#2E7D32", "#2E7D32");
 
    colorBotonCloseHotkeys("#C62828", "#2F2F2A");
    bordeBotonCloseHotkeys("#C62828", "#C62828");
 
    colorBotonSaveTheme("#2e7d32", "#400A85");
    bordeBotonSaveTheme("#2e7d32", "#2e7d32");
 
 
    colorInput("#27A2DC");
    colorTextoInput("#F4035E");
 
    colorSelect("#27A2DC");
    colorTextoSelect("#F4035E");
 
    colorPicker("#B82653");
 
    nuevoCursor("http://isyx.me.pn/custom_mouse_white.cur");
    
    $("#clantag").attr("placeholder", "tag ʍт ❥");
 
    setTimeout(function() {
        alert("Welcome to ʍт ? Clan Private Extension!");
    }, 2000);
 
}
 
function modificarTextoMinimapa(titulo) {
    var texto = CanvasRenderingContext2D.prototype._fillText;
    CanvasRenderingContext2D.prototype._fillText = function(){
        if(arguments[0] == 'ogario.ovh'){
            arguments[0] = titulo; // arguments[0] = 'ву тнєσ ♔'; // Borra el texto transparente encima del minimapa
        }
        return texto.apply(this,arguments);
    };
}
 
function modificarTextoLeaderboard(titulo) {
    var texto = $("h4.main-color").text();
    if (texto === "ogario.ovh") {
        $("h4.main-color").text(titulo);
    }
 
    // Cambia el leaderboard
    $("h4.main-color").on('DOMSubtreeModified', function() {
        var texto = $(this).text();
        if (texto !== "Leaderboard") {
            $(this).text(titulo);
        }
    });
}
 
function modificarCanalYoutube(titulo, ID) {
    $(".ogario-yt-panel").remove();
    $("#profile").append('<div class="agario-panel ogario-yt-panel"></div>');
    $(".ogario-yt-panel").append('<h5 class="main-color">' + titulo + '</h5>');
    $(".ogario-yt-panel").append(
        '<center><div class="g-ytsubscribe" data-channelid="' + ID + '" data-layout="full" data-theme="dark" data-count="default"></div></center>');
    $(".ogario-yt-panel").insertBefore(".radio-panel");
}
 
function modificarFooter(texto, URL) {
    if (texto === undefined) {
        $("#menu-footer-v").hide();
    } else {
        if (URL === undefined) {
            $("#menu-footer-v").text(texto);
        } else {
            $("#menu-footer-v").html('<a href="' + URL + '" target="_blank">' + texto + '</a>');
        }
    }
}
