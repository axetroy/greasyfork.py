// ==UserScript==
// @name        TV3Play
// @namespace   anti-adblock
// @include     http://play.tv3.lt/*
// @description Sustabdo TV3 play anti-adblock.
// @version     1
// @grant       none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
     var p = JSON.parse;
     JSON.parse = function(str) {
         var obj = p(str);
         if(obj.ab_allowed === false) {
             obj.ab_allowed = true;
             console.log('Anti adblock activated');
         }
         return obj;
     };
})();