// ==UserScript==
// @name         Instagram Picture Alt Displayer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  With this script you will be able to see the 'alt' data of a picture by clicking on it.
// @author       torturtle
// @match        https://www.instagram.com/*
// @match        https://www.instagram.com
// @grant        none
// ==/UserScript==


    var images = document.getElementsByClassName('FFVAD'),
        crap = document.getElementsByClassName('_9AhH0'),
        span = document.createElement('span'),
        fent = 0,i;
    span.style.position = 'fixed';
    span.style.padding = '10px';
    span.style.top = '0';
    span.style.left = '0';
    span.style.color = 'lime';
    span.style.backgroundColor = 'black';
    span.style.borderRadius = '0 0 15px 0';
    span.style.fontFamily = 'Monospace';
    span.innerHTML = 'Hello I will tell you what is on a picture if you click on it.<br>If its not working on a picture, spin your mousewheel a bit.';
    document.body.appendChild(span);
    function reset() {
        var images = document.getElementsByClassName('FFVAD');
        var crap = document.getElementsByClassName('_9AhH0');
        for (i = 0; i < crap.length; i++) {
            crap[i].style.zIndex = '-100';
        }
        for (i = 0; i < images.length; i++) {
            images[i].addEventListener('click',function(){
                fent = -30;
                span.style.top = fent + 'px';
                span.innerHTML = this.alt;
            });
        }
    }
    window.addEventListener('wheel',function(){
        reset();
    });
    reset();
    var mozgj = setInterval(function() {
        if (fent <= 0) {
            span.style.top = fent + 'px';
            fent++;
        }
    },10);