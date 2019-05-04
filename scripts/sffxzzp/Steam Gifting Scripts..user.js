// ==UserScript==
// @name         Steam Gifting Scripts.
// @namespace    https://coding.net/u/sffxzzp
// @version      0.01
// @description  A script that makes gifting to one that already have the game possible.
// @author       sffxzzp
// @match        *://store.steampowered.com/checkout/sendgift/*
// @icon         https://store.steampowered.com/favicon.ico
// ==/UserScript==

(function() {
    var friends = document.getElementsByClassName('friend_block disabled');
    for (var i=0;i<friends.length;i++) {
        friends[i].getElementsByTagName('input')[0].removeAttribute("disabled");
        friends[i].classList.remove("disabled");
    }
})();