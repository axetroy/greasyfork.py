// ==UserScript==
// @name         search-engine-stop
// @namespace    searchenginestop
// @version      0.1
// @description  prevents sites to add their own line in the Chrome search engines list
// @author       unknow
// @include        http://*
// @include        https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var elOpenSearch = document.querySelector('[type="application/opensearchdescription+xml"]');
    if (elOpenSearch) elOpenSearch.remove();
})();