// ==UserScript==
// @name         Quick link copy
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Script to add a one-click "copy link" button on the page, just hover on the left of the page and the button should appear, click it to copy the page's link to your clipboard.
// @author       Lilian Tedone
// @match        *://*/*
// @grant        none
//@require       https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

$("body").append('<div id="copycurrentpageurl"></div> <style>#copycurrentpageurl{ width:30px; height:100vh; position:fixed; top:0px; left:0px; z-index:100000000000000000000000000000000; } #copycurrentpageurl::after{ content:""; width:50px; height:100vh; background:#212121 url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgyVjNoMTJWMXptMyA0SDhjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTFjMS4xIDAgMi0uOSAyLTJWN2MwLTEuMS0uOS0yLTItMnptMCAxNkg4VjdoMTF2MTR6Ii8+PC9zdmc+) 50% 50%/50% no-repeat; position:fixed; top:0px; left:0px; transform:translate(-50px); transition:transform 150ms cubic-bezier(0,0,0,1); cursor:pointer; } #copycurrentpageurl:hover::after{ transform:translate(0,0); box-shadow:0 0 20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1) inset; } #copycurrentpageurl:active::after{ background:#2979FF url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgyVjNoMTJWMXptMyA0SDhjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTFjMS4xIDAgMi0uOSAyLTJWN2MwLTEuMS0uOS0yLTItMnptMCAxNkg4VjdoMTF2MTR6Ii8+PC9zdmc+) 50% 50%/50% no-repeat; transform:translate(0,0); box-shadow:0 0 20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1) inset; }</style>');
console.log("tes1");
$("#copycurrentpageurl").click(function(){
    console.log("test");
    copyToClipboard();
});
function copyToClipboard() {
    console.log("test2");
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(window.location.href).select();
    document.execCommand("copy");
    $temp.remove();
}