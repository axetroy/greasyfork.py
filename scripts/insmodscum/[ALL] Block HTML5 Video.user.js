// ==UserScript==
// @name            [ALL] Block HTML5 Video
// @author
// @description     Block HTML5 video.
// @downloadURL
// @grant
// @homepageURL     https://bitbucket.org/INSMODSCUM/userscripts-scripts/src
// @icon
// @include         http*://*
// @namespace       insmodscum 
// @require
// @run-at          document-start
// @updateURL
// @version         1.0
// ==/UserScript==

(function(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = 'document.createElement("video").constructor.prototype.canPlayType = function(type){return ""}';
    document.documentElement.appendChild(script);
})();