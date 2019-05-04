// ==UserScript==
// @name         Pixlr Apps Ad Remover
// @namespace    http://lukaszmical.pl/
// @version      0.2.1
// @description  Remove Ad in Pixlr Apps
// @author       Łukasz
// @match        https://pixlr.com/editor/*
// @match        https://pixlr.com/express/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var elements = ['.pro-app-wrap', '.ad-wrap'];
    for(var i = 0; i < elements.length; i++){
        var addContainer = document.querySelector(elements[i]);
        if(addContainer){
            addContainer.parentNode.removeChild(addContainer);
        }
    }
    document.getElementsByTagName('body')[0].style.padding = 0;
})();