// ==UserScript==
// @name         Ebates Anti-Anti-Adblock
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Stops anti-adblock on ebates.com
// @author       Couchy
// @match        https://www.ebates.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const getfunc = function(){return 9001;};
    const qsa = document.getElementsByClassName.bind(document);
    document.getElementsByClassName = function(str){
        let elems = qsa(str);
        if(str.indexOf("blockdecoy") !== -1 && elems && elems.length){
            for(let i = 0; i < elems.length; i++){
                if(typeof elems[i] === "object"){
                    Object.defineProperty(elems[i], "offsetWidth", {get: getfunc});
                    Object.defineProperty(elems[i], "offsetHeight", {get: getfunc});
                }
            }
        }
        return elems;
    };
})();