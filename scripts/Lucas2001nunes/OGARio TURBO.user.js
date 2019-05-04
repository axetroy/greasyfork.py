// ==UserScript==
// @name         OGARio TURBO
// @namespace    TURBO.v1
// @version      1
// @description  BY : TURBO
// @author       TURBO
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/ogario" + location.hash;
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
    document.title = "OGARio TURBO";
    modificarTextoMinimapa("By TURBO");
    modificarTextoLeaderboard("TURBO");
    modificarCanalYoutube("Sign up a my channel", "UCTfXuddmQsBBT_PIPCZLyVQ");
    modificarFooter("TURBO"); 
panelDerecho();
    ocultarBotonAdelante();
    ocultarBotonAtras();
    redondearPanelCentral("10");
    redondearPanelDerecho("10");
    modificarMargenesPanel();
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
 
function panelDerecho(){$("#prev-profile").attr("id","botonAtras"),$("#next-profile").attr("id","botonAdelante"),$("#botonAtras, #botonAdelante").css({width:"80px",height:"80px","border-radius":"50%",opacity:".6",transition:"all .2s linear",display:"inline-block","vertical-align":"bottom"}),$("#botonAtras img, #botonAdelante img").css({width:"80px",height:"80px",border:"0","border-radius":"50%"}),$("#botonAtras").on("click",function(){setProfile(0)}),$("#botonAdelante").on("click",function(){setProfile(1)}),$("#helloContainer").css("width","974px"),$("#helloContainer").css("top","50%","important"),$("#helloContainer").css("transform","translate(-50%,-50%)"),$("#helloContainer").css("text-align","center"),$("#options").css("text-align","left"),$("#og-options").css("text-align","left"),$("#theme-options").css("text-align","left"),$(".left-container").remove(),$(".right-container").remove(),$("#helloContainer").append('<div id="rightPanel2" class="side-container right-container" style="display: inline-block;">'),$("#rightPanel2").append('<div class="agario-panel agario-side-panel leaderboard-panel"></div>'),$(".leaderboard-panel").html('<style>@media screen and (max-width:580px) {.table { display: block }}.table>#hotkey_setting .row { font-size: 12px! important } #hotkey_setting .row {display: table-row; background: #333 }#hotkey_setting .row:nth-of-type(odd){background: #444 }#hotkey_setting .row.header {font-weight: 900; color: #fff; background: #1565c0 } #hotkey_setting .row.green {background : #27ae60 } #hotkey_setting .row.blue { background: #2980b9 !important } @media screen and (max-width:580px) {#hotkey_setting .row { padding:8px 0; display:block }}.table-row-selected { background: #c62828 !important; color:#fff !important}.cell { padding: 6px 12px; display: table-cell; font-size: 11px } @media screen and (max-width:580px) {.cell { padding:2px 12px; display:block } } .leaderboard-panel { width: 190px; padding: 15px; }.right-container { width: 190px; }#skinz, #skinz4, #skinz1, #skinz2, #skinz3, #skinz5, #skinz6, #skinz7, #skinz8, #skinz9, #skinz10 {float: left;display: inline-block;-webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);cursor: pointer;width: 70px;height: 70px;margin: 5px;border-radius: 100%;}</style><div id="skinsPanel"><img id="skinz1" style="opacity: 1; background: url(http://i.imgur.com/WQMyFfk.png);" class="1"></img><img id="skinz2" style="opacity: 1; background: url(http://i.imgur.com/fWSf996.png);" class="2"></img><img id="skinz3" style="opacity: 1; background: url(http://i.imgur.com/bf4riGt.png);" class="3"></img><img id="skinz4" style="opacity: 1; background: url(http://i.imgur.com/M4yrRt7.png);" class="4"></img><img id="skinz5" style="opacity: 1; background: url(http://i.imgur.com/CAQ3Su9.png);" class="5"></img><img id="skinz6" style="opacity: 1; background: url(http://i.imgur.com/KRxpM9f.png);" class="6"></img><img id="skinz7" style="opacity: 1; background: url(http://i.imgur.com/fPcuqzO.png);" class="7"></img><img id="skinz8" style="opacity: 1; background: url(http://i.imgur.com/hdhb111.png);" class="8"></img><img id="skinz9" style="opacity: 1; background: url(http://i.imgur.com/41riMKN.png);" class="9"></img><img id="skinz10" style="opacity: 1; background: url(http://i.imgur.com/62eOpMn.png);" class="10"></img></div>');for(var i=1;11>i;i++)null===localStorage.getItem("profile"+i)&&localStorage.setItem("profile"+i,null);$("head").append("<style>#img, #skinz, #skinz6, #skinz7, #skinz8, #skinz9, #skinz10, #skinz4, #skinz1, #skinz2, #skinz3, #skinz5 {background-size: cover !important;border-radius: 1000px!important;¡width: 100px;height: 100px;}#mainPanel2 #img, #skinz, #skinz6, #skinz7, #skinz8, #skinz9, #skinz10, #skinz4 #skinz1, #skinz2, #skinz3, #skinz5 {-webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);}</style>");var t=localStorage.getItem("activeprofile");if(null!==t){var n=JSON.parse(localStorage["profile"+t]);null!==n&&($("#clantag").val(n[0]),$("#nick").val(n[1]),$("#skin").val(n[2]),n[2]&&n[2].length>0&&$("#skin-preview img").attr("src",""+$("#skin").val()))}for(var i=1;11>i;i++){var a=JSON.parse(localStorage["profile"+i]);null!==a&&$("."+i).attr("src",""+a[2])}$(".1, .2, .3, .4, .5, .6, .7, .8, .9, .10").on("click",function(){var i=$(this).attr("class").split(" ")[0],t=parseInt(i)-1===0?10:parseInt(i)-1,n=parseInt(i)+1===11?1:parseInt(i)+1;console.log(t+" :  "+n),$("#botonAtras img").attr("src",$("#skinz"+t).attr("src")),$("#botonAdelante img").attr("src",$("#skinz"+n).attr("src")),window.localStorage.setItem("activeprofile",i);var a=JSON.parse(window.localStorage["profile"+i]);if(null!=a){$("#clantag").val(a[0]),$("#nick").val(a[1]);var e=a[2];$("#skin").val(e),e.length>0?($("#skin-preview img").fadeOut(100,"swing"),setTimeout(function(){$("#skin-preview img").attr("src",""+e)},100),$("#skin-preview img").fadeIn(100,"swing")):$("#skin-preview img").attr("src","")}else $("#clantag").val(""),$("#nick").val("Profile"+i),$("#skin").val(""),$("#skin-preview img").attr("src","");$("#skin").trigger("click")}),$("#clantag, #skin, #nick").on("input",function(){$("#skin-preview img").attr("src",""+$("#skin").val());var i=localStorage.getItem("activeprofile"),t=new Array;t[0]=$("#clantag").val(),t[1]=$("#nick").val(),t[2]=$("#skin").val(),localStorage["profile"+i]=JSON.stringify(t);for(var n=0,a=1;11>a;a++){var e=JSON.parse(localStorage["profile"+a]);null!==e&&(n++,$("."+a).attr("src",""+e[2]))}})}
 
function ocultarBotonAdelante() {
    $("#botonAdelante").hide();
    $("#next-profile").hide();
    $("#profiles").css("text-align", "center");
}
 
function ocultarBotonAtras() {
    $("#botonAtras").hide();
    $("#prev-profile").hide();
    $("#profiles").css("text-align", "center");
}
 
function redondearPanelCentral(r){void 0===r?$("#main-menu").css("border-radius","10px"):$("#main-menu").css("border-radius",r+"px")}
 
function redondearPanelDerecho(r){void 0===r?$(".leaderboard-panel").css("border-radius","10px"):$(".leaderboard-panel").css("border-radius",r+"px")}
 
 
function modificarMargenesPanel(margen) {
    if (margen === undefined) {
        margen = 20;
    }
    $("#main-menu, .center-container").css("width", "350px");
    $("#main-menu").css("padding", margen + "px");
    $(".menu-tabs").css("width", "100%");
    $(".agario-profile-panel, .agario-panel-freecoins, .agario-shop-panel, .ogario-yt-panel, .radio-panel").css("width", "100%");
}