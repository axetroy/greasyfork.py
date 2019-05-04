// ==UserScript==
// @name         Giphy Gif Source
// @namespace    http://ksir.pw/
// @version      1.0
// @description  View/Download Giphy gifs directly!
// @author       Kain
// @match        *://*.giphy.com/media/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

function extractID(){
    var regex = /\/media\/(.*)\//;
    // if((window.location.hostname || window.location.host).indexOf("tenor.com") > -1) regex = /\/images\/(.*)\//;
	var match = window.location.href.match(regex, 'gi');
    if(match !== null) window.location.href = 'https://i.giphy.com/' + match[1] + ".gif";
}

extractID();