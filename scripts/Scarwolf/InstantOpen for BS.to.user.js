// ==UserScript==
// @name         InstantOpen for BS.to
// @version      0.2
// @description  Opens BS.to Episode-Links directly
// @author       Scarwolf
// @match        http://bs.to/serie/*/*/*/*-*
// @grant        none
// @namespace http://pottii.de
// ==/UserScript==

var check = document.getElementById("video_actions").getElementsByTagName('a')[0];
if(check != null){
    var url = check.href;
    console.log("Opening " + url);
    window.open(url);
}