// ==UserScript==
// @name         Send to Kindle from Pocket
// @namespace    https://greasyfork.org/zh-CN/scripts/370107-send-to-kindle-from-pocket
// @version      0.2
// @description  Send article to Kindle from Pocket.
// @author       Dingar
// @match        https://getpocket.com/a/read/*
// @match        https://getpocket.com/a/queue/*
// @grant        none
// ==/UserScript==

var addLink=function() {
    'use strict';
    var li,link,kindleLink;
    if(document.URL.indexOf("read")> -1){
        link=document.getElementsByClassName('domain')[0].getElementsByTagName("a");
        link[0].href = link[0].href.replace('https://getpocket.com/redirect','http://fivefilters.org/kindle-it/send.php');
        link[0].innerText="Send to Kindle";
        link[0].target = "_self";
    }else if(document.URL.indexOf("queue")> -1){
        li=document.getElementsByClassName('original_url_container');
        for (var i = 0; i < li.length; i++) {
            link=li[i].getElementsByClassName('original_url');
            if(!link[1]){
                kindleLink = document.createElement('a');
                kindleLink.setAttribute("class", "original_url");
                kindleLink.innerText="【Kindle】";
                kindleLink.href = link[0].href.replace('https://getpocket.com/redirect','http://fivefilters.org/kindle-it/send.php');
                link[0].parentNode.insertBefore(kindleLink,link[0]);}
        }
    }
}

window.addEventListener('load', addLink);
window.addEventListener('DOMNodeInserted', addLink);
