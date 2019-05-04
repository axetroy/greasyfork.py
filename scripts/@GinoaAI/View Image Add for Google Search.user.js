// ==UserScript==
// @name 	View Image Add for Google Search
// @description Googleの画像検索時に『画像を表示』ボタンの追加
// @author 	GinoaAI
// @namespace 	https://greasyfork.org/ja/users/119008-ginoaai
// @version 	1.1
// @include 	https://*.google.*/search?tbm=isch*
// @include 	https://*.google.*/search?*&tbm=isch*
// @icon 	https://pbs.twimg.com/profile_images/789285418722217985/aMIeJGk-_400x400.jpg
// @grant	GM_openInTab
// @run-at	document-idle
// ==/UserScript==

(function() {
    'use strict';
    var element = document.querySelectorAll("._FKw td:nth-child(1)");
    var elementtimer = setInterval(function(){
        var element = document.querySelectorAll("._FKw td:nth-child(1)");
        if (element.length) {
            var newElement = document.createElement("td");
            var link = document.createElement("a");
            link.href = 'javascript:void function(){function isElementVisible(el){var rect=el.getBoundingClientRect(),vWidth=window.innerWidth||doc.documentElement.clientWidth,vHeight=window.innerHeight||doc.documentElement.clientHeight,efp=function(x,y){return document.elementFromPoint(x,y)};return rect.right<0||rect.bottom<0||rect.left>vWidth||rect.top>vHeight%3F!1:el.contains(efp(rect.left,rect.top))||el.contains(efp(rect.right,rect.top))||el.contains(efp(rect.right,rect.bottom))||el.contains(efp(rect.left,rect.bottom))}"undefined"==typeof window.isElementVisible;{var imgs=document.querySelectorAll(".irc_mi");imgs.forEach(function(img){isElementVisible(img)%26%26window.open(img.src)})}}();';
            var span = document.createElement("span");
            span.classList.add("_WKw");
            span.appendChild(document.createTextNode("画像を表示"));
            link.appendChild(span);
            newElement.appendChild(link);
            for (var i = 0; i < element.length;i++) {
                element[i].after(newElement.cloneNode(true));
            }
            clearInterval(elementtimer);
        }
    },100);
})();