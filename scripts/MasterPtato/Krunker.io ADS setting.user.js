// ==UserScript==
// @name         Krunker.io ADS setting
// @version      0.1
// @description  Allows you to change the amount of sensitivty for aiming down sights on Krunker.
// @author       MasterPtato
// @match        krunker.io/*
// @match        http://krunker.io/*
// @match        http://www.krunker.io/*
// @namespace https://greasyfork.org/users/58797
// ==/UserScript==

(function() {
    'use strict';

    var sens2 = localStorage.ads || 0.5;

    window.changeSens2 = function(value){
        sens2 = value;
        localStorage.setItem('ads',value);
        if(document.getElementById('slideads')) document.getElementById('slideads').innerHTML = sens2;
        function ads(e){
            if(e.button == 2){
                setSetting(2, sens2)
            }
        }
        function adsoff(e){
            if(e.button == 2){
                setSetting(2, 1)
            }
        }
        window.addEventListener("mousedown",ads);
        window.addEventListener("mouseup",adsoff);
    }
    document.getElementsByClassName('menuLink gButton')[2].addEventListener('click',()=>{
        document.getElementsByClassName('settName')[2].innerHTML += `<div class="settName">ADS Sens. <span class="sliderVal" id="slideads">0.5</span><div class="slidecontainer"><input type="range" min="0.1" max="4" step="0.1" value="0.5" class="sliderM" oninput="changeSens2(this.value)"></div></div>`;
        changeSens2(sens2);
    });
})();