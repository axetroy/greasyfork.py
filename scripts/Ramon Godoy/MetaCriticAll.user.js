// ==UserScript==
// @name        MetaCriticAll
// @namespace   http://stackoverflow.com/users/982924/rasg
// @author      RASG
// @version     2016.12.30
// @description Metacritic ratings everywhere. See the supported sites in the @include section of the script.
// @icon        http://www.metacritic.com/favicon.ico
// @require     http://code.jquery.com/jquery.min.js
// @resource    metacritic.global.css https://raw.githubusercontent.com/yodog/userscripts/master/res/metacritic.global.css
// @resource    metacritic.base.css   https://raw.githubusercontent.com/yodog/userscripts/master/res/metacritic.base.css
// @resource    metacritic.css        https://raw.githubusercontent.com/yodog/userscripts/master/res/metacritic.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// @include     http*://*.getgamesgo.com/*
// @include     http*://*.greenmangaming.com/*/games/*
// @include     http*://*.nuuvem.com.br/produto*
// @include     http*://*steamcommunity.com/id/*/wishlist
// @include     http*://*.steamgifts.com/*
// @include     http*://*store.steampowered.com/*
// ==/UserScript==

// temporarily disabling isthereanydeal, until someone have time to fix it
// @include     http*://*isthereanydeal.com/*

var estilo1 = GM_getResourceText ("metacritic.global.css");
GM_addStyle (estilo1);
var estilo2 = GM_getResourceText ("metacritic.base.css");
GM_addStyle (estilo2);
var estilo3 = GM_getResourceText ("metacritic.css");
GM_addStyle (estilo3);


$(function(){

    // SEARCHING FOR GAMES
    
    if (window.location.href.indexOf('getgamesgo.com/product/') > -1) {
        full_ou_mini = 'full';
        elementos = $('#pageTitle'); 
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $('nav.mainTitle').removeClass('mainTitle').css({"border":"2px solid rgb(66, 127, 166)", "background":"none repeat scroll 0% 0% rgb(0, 0, 0)"});
    }

    if (window.location.href.indexOf('greenmangaming.com/s') > -1) {
        full_ou_mini = 'full';
        elementos = $('div#main > .prod_det');
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $("<style>.metafull { display: table !important; }</style>").appendTo(document.documentElement);
        $("div.wrapper").css({"min-width":"70%", "max-width":"90%"});
    }

    if (window.location.href.indexOf('isthereanydeal.com') > -1) {
        full_ou_mini = 'mini';
        elementos = $('div.title'); 
        elementos.css({'border':'1px solid red'})
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
    }

    if (window.location.href.indexOf('nuuvem.com.br/produto/') > -1) {
        full_ou_mini = 'full';
        elementos = $('div.blockholder.right > .blockcontent > header > h2 > strong');
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $("div.wrapper.pageholder").css({"min-width":"70%", "max-width":"90%"});
        $("div.blockholder.right").css({"min-width":"70%", "max-width":"90%"});
    }

    if (window.location.href.indexOf('nuuvem.com.br/produtos') > -1) {
        full_ou_mini = 'mini';
        elementos = $('div.info > a.name');
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $("<style>.main_details, .side_details { width: 250px; }</style>").appendTo(document.documentElement);
        $("<style>div.metamini { float: left; }</style>").appendTo(document.documentElement);
        $("div.wrapper").css({"max-width":"90%", "width":"auto"});
        $("div#produtos").css({"display":"table"});
        $("div.games").css({"width":"auto", "height":"auto"});
        $("div.list > ul > li").css({"height":"52px", "overflow":"hidden"});
        $("div.info").css({"min-width":"800px", "width":"auto"});
        $("li div.purchase").css({"float":"right"});
    }

    if ((window.location.href.indexOf('steamcommunity.com/id/') > -1) && (window.location.href.indexOf('/wishlist') > -1)) {
        full_ou_mini = 'mini';
        elementos = $('div.wishlistRowItem > h4');
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $("<style>.main_details, .side_details { width: 200px; }</style>").appendTo(document.documentElement);
        $("<style>div.metamini { float: left; }</style>").appendTo(document.documentElement);
        $("div.wishlistRow").css({"height":"auto", "overflow":"hidden", "width":"850px"});
        $("div.bottom_controls").css({"position":"initial"});
    }

    if (window.location.href.indexOf('steamgifts.com') > -1) {
        full_ou_mini = 'full';
        elementos = $('.ajax_gifts > .post > .left > .title > a');
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $("<style>div.ajax_gifts div.left { border: 1px dotted red; }</style>").appendTo(document.documentElement);
    }
    
    if (window.location.href.indexOf('store.steampowered.com/app') > -1) {
        full_ou_mini = 'full';
        elementos = $('.apphub_HeaderStandardTop > .apphub_AppName');
        $("<style>.main_details, .side_details { display: inline-block; }</style>").appendTo(document.documentElement);
        $("<style>.apphub_HeaderStandardTop { height: auto !important; background-size: 100% auto; }</style>").appendTo(document.documentElement);
    }

    // METACRITIC CONTENT
    
    if (full_ou_mini == 'full') {
        var inicio = /(?=<div class="summary_wrap">)/i;
        var fim = '<div class="module critic_user_reviews">';
        var classe = 'metafull';
    }
    else if (full_ou_mini == 'mini') {
        var inicio = /(?=<div class="section product_scores">)/i;
        var fim = '<div class="section product_details">';
        var classe = 'metamini';
    }
    else {
        alert('variable full_ou_mini not defined for this domain');
        return;
    }

    // DOM
    
    elementos.each(function() {
        var elemjogo = $(this)
        var jogo = elemjogo.text()
        
        console.log('jogo encontrado: ' + jogo)
        
        jogo = jogo.replace(/\(MAC|NA\)*$/i, "");
        jogo = jogo.replace(/[\.,\/#!$%\^&\*;:{}=\_`'´"~()]/g, "")
        jogo = $.trim(jogo).toLowerCase()
        jogo = jogo.replace(/[\s\-]+/g, '-');
        
        $(elemjogo).append("<div id='" + jogo + "' class='" + classe + "' style='display:inline-block; font-size:9px;' />")
        
        requisicao = "http://www.metacritic.com/game/pc/" + encodeURIComponent(jogo)
        conectar('GET', requisicao, respostametacritic)

        function conectar(metodo, endereco, resposta, corpo) {
            console.log('pesquisando no endereco: ' + endereco)
            
            callback = function(xhr) { resposta(xhr) };
            GM_xmlhttpRequest({
                "method"	: metodo,
                "url"		: endereco,
                "onerror"	: callback,
                "onload"	: callback,
                "headers"	: {'Content-Type' : 'application/x-www-form-urlencoded'},
                "data"		: corpo
            });
        }

        function respostametacritic(detalhes) {
            $("#" + jogo).html(detalhes.responseText.split(inicio)[1].split(fim)[0])
        }
    })

});
