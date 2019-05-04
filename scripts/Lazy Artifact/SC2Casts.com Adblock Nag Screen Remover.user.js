// ==UserScript==
// @name         SC2Casts.com Adblock Nag Screen Remover
// @namespace    http://lazy.artifact
// @version      0.36
// @description  Removes the 'disable Adblock' nag screen.
// @author       Lazy Artifact
// @match        http://sc2casts.com/*
// @grant        none
// ==/UserScript==

(function() {
   
    document.createElement = (function() {
        var base = document.createElement,
            scriptRegex = /script/i;
        
        return function(tag) {
            if(scriptRegex.test(tag)) {
                tag = 'noscript';
            }
            
            return base.call(this, tag);
        };
    })();
    
    
   
   
})();