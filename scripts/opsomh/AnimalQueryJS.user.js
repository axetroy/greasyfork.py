// ==UserScript==
// @name        AnimalQueryJS
// @description Tries to speedup browsing by disabling JS (jQuery) animations
// @version     2018.04.19.1501
// @namespace   https://greasyfork.org/users/30-opsomh
// @grant       none
// @include     *
// @exclude     https://www.olx.pl/*
// ==/UserScript==

(function(){
    if(window && window.jQuery && window.jQuery.fx){
        window.jQuery.fx.off=true;
        //window.jQuery.fx.speeds = { slow: 60, fast: 20, _default: 40 };
        //window.jQuery.easing._default = 'linear';
    }
})(); 
