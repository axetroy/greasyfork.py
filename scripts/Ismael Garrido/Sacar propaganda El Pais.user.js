// ==UserScript==
// @name         Sacar propaganda El Pais
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://elpais.com.uy/*
// @include      http://www.elpais.com.uy/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var f = function(){
        if($("html").attr("class") !== ""){
            $("html").attr("class", "");
            $(".fancybox-overlay").remove();
            return true;
        }
        return false;
    }
    
    var fwrap = function(){
        if(!f()){
            setTimeout(fwrap, 100);
        }
    }
    setTimeout(fwrap, 100);

})();


