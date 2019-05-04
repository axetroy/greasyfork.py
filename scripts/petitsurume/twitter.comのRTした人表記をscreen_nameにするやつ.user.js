// ==UserScript==
// @name         twitter.comのRTした人表記をscreen_nameにするやつ
// @namespace    https://surume.tk/
// @version      0.1
// @description  twitter.comのRTした人表記をscreen_nameにするやつです
// @author       petitsurume
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // TODO: setIntervalを使うのをやめてMutationObserverとかその辺を使う
    setInterval(function(){
        document.body.querySelectorAll(".js-retweet-text > .js-user-profile-link:not(.userjs-retweet-screen-named").forEach(function(link){
            link.getElementsByTagName("b")[0].innerText = link.pathname.replace("/","@")
            link.className+=" userjs-retweet-screen-named"
        })
    },1000);
})();