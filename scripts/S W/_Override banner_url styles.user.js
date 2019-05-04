// ==UserScript==
// @name     _Override banner_url styles
// @include  https://*.die-staemme.de/*
// @grant    GM_addStyle
// @run-at   document-start
// @version  1.0
// @namespace die-staemme.bigger.chat
// @description blabla
// ==/UserScript==
(function() {
    'use strict';
    GM_addStyle ( `
.chat-body {
height: 600px;
}
` );
})();
