// ==UserScript==
// @name         Fix Trello Scrollbar in Firefox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix Trello Horizontal Scrollbar in Firefox
// @author       Silas Moura
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var detectBoard = setTimeout(()=>{
        if(board==undefined) return false;
        clearInterval(detectBoard);
        board.style.marginBottom='0px';
    },500);

})();