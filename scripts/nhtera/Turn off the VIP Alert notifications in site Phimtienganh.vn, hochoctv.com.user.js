// ==UserScript==
// @name         Turn off the VIP Alert notifications in site Phimtienganh.vn, hochoctv.com
// @description  enter something useful
// @author       TienNH
// @include      http://phimtienganh.vn/*
// @include      http://hochoctv.com/*
// @grant        none
// @version 2.0.0.0
// @namespace https://greasyfork.org/users/16893
// ==/UserScript==
(function(){
    window.onload = function() {
         window.limit_time = 999999999;
    };

    $('.mconfirm-popup').hide();
    
    // document.cookie = 'count_watch' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    /*window.onload = function() {
         for (var i = 1; i < 99999; i++)
            window.clearInterval(i);
    };*/
})();
