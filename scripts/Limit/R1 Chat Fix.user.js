// ==UserScript==
// @name         R1 Chat Fix
// @description  Solves the scrolling issue present in chat on R1 v4
// @version      1.2
// @author       LiMiTx
// @match        http://www.rewards1.com/*
// @grant        none
// @namespace    https://greasyfork.org/users/141657
// ==/UserScript==
var s = $('#r1_shoutbox');
var o = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if ($(".shoutbox_msg:last").css('opacity') < 1) {
            s.scrollTop(s[0].scrollHeight);
        }
    });
});
var c = { childList: true };
o.observe(s[0], c);