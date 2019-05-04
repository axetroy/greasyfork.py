  // ==UserScript==
// @name        Google to Yahoo
// @description Redirects Google to Yahoo
// @include     http://*.google.*/*
// @version     1
// @namespace lol
// ==/UserScript==
    if(content.document.location == "http://google.com"){
            window.location.replace("http://yahoo.com")
}