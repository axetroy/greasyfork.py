// ==UserScript==
// @name remover Paywall Folha, Globo, Exame e Estadão (AdBlock, assinantes etc)
// @namespace http:///
// @version 0.30
// @description Eu quero ler notícias sem propagandas e sem precisar me logar. Informação deve ser livre!
// @include http*://*.folha.*.br/*
// @include http*://*.blogfolha.uol.com.br/*
// @include http*://*.globo.com/*
// @include http*://*.estadao.com.br/*
// @include http*://*.abril.com.br/*
// @run-at document-body
// @copyright 2013+, jgs
// ==/UserScript==

var s = unsafeWindow.document.createElement('script');
s.innerHTML = '('+(function(){
    var url = document.location.hostname;
    function blockAdBlockerExame() {
        if (jQuery('.tp-modal, .tp-backdrop, .tp-modal-open').length) {
            jQuery('.tp-modal, .tp-backdrop, .tp-modal-open').remove();
            jQuery('body').css('overflow', 'auto');
        } else {
            window.setTimeout(blockAdBlockerExame, 1000);
        }
    }
    function blockPaywall(){
        //debugger;
        if(url.search('.abril.') >= 0) {
            window.setTimeout(blockAdBlockerExame, 1000);
        } else if(url.search('folha.') >= 0) {
            var paywallMockDiv = document.createElement('DIV');
            paywallMockDiv.setAttribute('data-paywall-box', '');
            paywallMockDiv.setAttribute('data-paywall', '');
            paywallMockDiv.style.display = 'none';
            document.body.prepend(paywallMockDiv);
        } else if(url.search('globo.com') >= 0 && typeof window.ControlaAcesso === 'object') {
            ControlaAcesso.registrar = function(){console.log("Block");};
        } else if(url.search('globo.com') >= 0 && typeof window.Piano === 'object') {
            window.Piano = {}
        } else if(url.search('estadao.') >= 0 && typeof window.pw === 'object') {
            window.pw = {};
        } else {
            window.setTimeout(blockPaywall, 50);
        }
    }
    blockPaywall();
}).toString()+')()';
unsafeWindow.document.head.appendChild(s);