// ==UserScript==
// @name           HD-Streams.org Openload Downloader
// @name:de        HD-Streams.org Openload Downloader
// @version        1.0
// @description    Download movies quickly in high quality
// @description:de Downloade Filme schnell in hoher Qualität
// @namespace      https://github.com/Sv443
// @author         Sv443
// @license        MIT
// @copyright      2018, Sv443 (https://github.com/Sv443)
// @match          http*://www.hd-streams.org/*
// @match          http*://hd-streams.org/*
// @grant          GM_openInTab
// @grant          GM_notification
// @run-at         document-start
// @require        https://cdn.jsdelivr.net/gh/Sv443/jslib@1/jslib.js
// @connect        self
// @connect        *
// ==/UserScript==

const key_download = 115; //key to open openload video in new tab so it can be downloaded (default: F4 (115))   -   list of key codes: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes




let src;
setInterval(function(){
    src = document.getElementById("embededVideo").src.replace("embed", "f");
}, 1000);

document.addEventListener("keydown", function(e){
    if(e.keyCode == key_download && !isempty(src)) {
        alert("Click Download on the tab that will open to download the video!\n\nHD-Streams.org Openload Downloader by Sv443 (https://sv443.net/)");
        GM_openInTab(src);
    }
});