// ==UserScript==
// @name         Tieba Remove Ban Popup
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  Remove the ban popup in tieba, not the ban status
// @author       Hello World
// @match        *://tieba.baidu.com/i/i/*
// @match        *://tieba.baidu.com/home/main*
// @require      https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.dialog_block j_itb_block, .dialogJ .dialogJfix .dialogJshadow, .dialogJmodal, .dialogJ .dialogJfix .dialogJshadow .ui-draggable').css('display', 'none');
    // Your code here...
})();