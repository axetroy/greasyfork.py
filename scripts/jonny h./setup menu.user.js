// ==UserScript==
// @name         setup menu
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://bs.to/*
// @grant        none
// donationsURL paypal.me/JonathanHeindl :3
// ==/UserScript==

(function() {
    'use strict';
     document.getElementById("other-series-nav").children[0].onmouseenter = function () {
            var list = document.getElementById("other-series-nav").children[1].children;
            var width = document.getElementById("other-series-nav").getBoundingClientRect().width;
            var offset = 0;
            var amount = 0;
            for (var i = 0; i < list.length; i++) {
                list[i].style.width = list[i].parentElement.parentElement.children[0].offsetWidth + "px";
                list[i].style.position = "absolute";
                list[i].style.top = amount + "px";
                list[i].style.left = (offset * width) + "px";
                amount += JSON.parse(document.defaultView.getComputedStyle(list[i]).height.split("px")[0]);
                if (document.getElementById("other-series-nav").getBoundingClientRect().top + amount > window.innerHeight - 100) {
                    if (((offset+1)*width)+list[i].parentElement.parentElement.children[0].offsetWidth<window.innerWidth){
                        offset++;
                        amount = 0;
                    }
                }
            }
        };
    // Your code here...
})();