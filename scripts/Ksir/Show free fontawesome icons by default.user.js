// ==UserScript==
// @name         Show free fontawesome icons by default
// @namespace    http://ksir.pw
// @version      0.1
// @description  Uses the free icon filter by default for fontawesome
// @author       You
// @match        https://fontawesome.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

if(window.location.search.indexOf("m=free") == -1){
    var url = [window.location.protocol, "//", window.location.hostname, window.location.pathname, window.location.search].join("");
    window.location.href = (window.location.search[0] === "?" ? url + "&m=free" : url + "?m=free");
}