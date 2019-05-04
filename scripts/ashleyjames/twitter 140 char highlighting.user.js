// ==UserScript==
// @name         twitter 140 char highlighting
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  return 140 char highlighting to twitter
// @author       ashleyjames.xyz
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var textdiv = document.getElementById('tweet-box-home-timeline');
    var otherdiv = document.getElementById('tweet-box-global');
    textdiv.onkeyup = function(){
        var str = textdiv.innerText;
        if (str.length > 140){
            textdiv.style.backgroundColor = "#faa";
        }
        else if (str.length <= 140){
            textdiv.style.backgroundColor = "#fff";
        }
    };
    otherdiv.onkeyup = function(){
        var otherstr = otherdiv.innerText;
        if (otherstr.length > 140){
            otherdiv.style.backgroundColor = "#faa";
        }
        else if (otherstr.length <= 140){
            otherdiv.style.backgroundColor = "#fff";
        }
    };
})();