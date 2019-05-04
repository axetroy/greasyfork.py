// ==UserScript==
// @name         Youtube No Autoplay - Disable "Up Next"
// @namespace    YoutubeNoAutoplay
// @version      2.93
// @description  Disable annoying autoplay button
// @author       yakumo_ran
// @match        *://www.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

function gensokyo(){
    LegacyButtonVersion();
    ModernCookieBased();
}

function ModernCookieBased() {
    var name = 'PREF'
    var disableAutoplay = '&f5=30000'
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match.includes('f5=20000') == true) {
        var newstr = match[2].replace(/f5=20000/, "f5=30000");
        document.cookie = 'PREF=' + newstr + ';  path=/; domain=.youtube.com';
    } else if (match.includes('f5=30000') == false) {
        document.cookie = 'PREF=' + match[2] + disableAutoplay + ';  path=/; domain=.youtube.com';
    }
}

function LegacyButtonVersion() {
    "use strict";
    var runs = 0;
    function yakumo(shikigami) {
        if (shikigami.hasAttribute("checked") == true) {
            shikigami.click();
        }
    }
    function yukari() {
        var ran = document.getElementById("toggle"),
            chen = document.getElementById("toggleButton"),
            youkai = document.getElementById("improved-toggle");
        if (ran != null) {
            yakumo(ran);
        }
        if (chen != null) {
            yakumo(chen);
        }
        if (youkai != null) {
            yakumo(youkai);
        }
        if (runs++ < 40) {
            setTimeout(yukari, 500);
        }
    }
    yukari();
};

window.addEventListener("yt-navigate-finish", gensokyo);
window.addEventListener("spfdone", gensokyo);
gensokyo();
