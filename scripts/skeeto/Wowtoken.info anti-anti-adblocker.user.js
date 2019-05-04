// ==UserScript==
// @name         Wowtoken.info anti-anti-adblocker
// @namespace    skeeto
// @description  Fools the anti-adblocker on wowtoken.info
// @lastupdated  2017-04-24
// @version      1.0
// @license      Public Domain
// @include      https://wowtoken.info/
// @grant        none
// ==/UserScript==

(function() {
    var e = document.getElementsByClassName('realm-panel');
    for (var i = 0; i < e.length; i++)
        e[i].classList.remove('realm-panel');
}());

setTimeout(function() {
    wowtoken.LoadHistory(); 
    wowtoken.Notification.Check();
    document.getElementById('block-warn').remove();
}, 100);
