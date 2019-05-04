// ==UserScript==
// @name         Barter.vg, Offer details Style
// @description  Add style for offer details
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @author       You
// @match        https://barter.vg/u/*/o/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @runat        document-end
// @grant        none
// @nowrap
// ==/UserScript==
(function() {
    'use strict';
    var $ = jQuery.noConflict();
    $(function () {
        $("<style />").text((function (){/*
        #offers td > .normal + div, #offers td > .normal + div + div {
            overflow: unset !important;
            text-overflow: unset !important;
            height: auto !important;
            font-size: 15px !important;
            line-height: 1.4em;
            max-height: 10em;
            font-family: Consolas, "Courier New";
        }
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]).appendTo("head");
    });
    // Your code here...
})();