// ==UserScript==
// @name         Munzee Map Pin Stacking
// @namespace    MunzeeMap
// @version      1.0.1
// @description  Fixed Pin Stacking on New OSM Maps on Munzee's Website. Also removes outer zoom limit.
// @author       MOBlox
// @match        https://www.munzee.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(map){
        setInterval(function(){
            var x = $('.mapboxgl-marker');
            for(var i = 0;i < x.length;i++){
                x[i].style.zIndex = x[i].getBoundingClientRect().top * 1 + 1;
            }
            map.setMinZoom(0);
            $('.mapboxgl-popup').css('z-index',10000000)
        });
    }
})();