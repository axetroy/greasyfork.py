// ==UserScript==
// @name         HS paywall remover, maksumuurin poistaja
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Removes weekly views limit on hs.fi. Ohittaa näyttökertarajoituksen.
// @author       Anonymous
// @match        http://www.hs.fi/*
// @match        https://www.hs.fi/*
// @match        http://hs.fi/*
// @match        https://hs.fi/*
// @grant        none
// @run-at       document-start
// @licence      Public Domain
// ==/UserScript==

(function() {
    'use strict';

    var ready = false;          
    
    // Run until paywall called or document ready
    var disablePaywall = function() {        
        
        window.MeteredPaywall = {
            init: function() { ready = true;}
        };        
        
        if(document.readyState === 'complete') {
            ready = true;
        }
        
        if(!ready) {
            setTimeout(disablePaywall, 0);
        }
        
    };    
       
    disablePaywall();

})();