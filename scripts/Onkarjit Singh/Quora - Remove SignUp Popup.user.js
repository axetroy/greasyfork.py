// ==UserScript==
// @name          Quora - Remove SignUp Popup
// @namespace     https://greasyfork.org/users/159531
// @description	  Removes sign-up popup on Quora.
// @author        Onkarjit Singh
// @include       http://quora.com/*
// @include       https://quora.com/*
// @include       http://*.quora.com/*
// @include       https://*.quora.com/*
// @run-at        document-start
// @version       0.0.1.20171116215542
// ==/UserScript==
(function() {
    var url = window.location.href;

    if (!/[&\?]share=1/.test(url)) {
        url += (url.indexOf('?') < 0 ? "?" : "&") + "share=1";
        window.location.replace(url);
    }
})();
