// ==UserScript==
// @name         UND NexusMods
// @namespace    http://ksir.pw/
// @version      4.6
// @description  Changes reddit links to the new domain for nexusmods & redirects if you are on the old site
// @author       Kain (ksir.pw)
// @match        https://www.nexusmods.com/*
// @match        https://www.reddit.com/*
// @grant        none
// ==/UserScript==

function old_test(url){
    return !!url.match(/^http(s?):\/\/nexusmods\.com(\/.*|$)/i) || !!url.match(/^http(s?):\/\/www.nexusmods\.com(\/.*|$)/i);
}

function test(url){
    return !!url.match(/^(|http(s?):\/\/)(|www.)nexusmods.com(\/.*|$)/gim);
}

function getNewPagePlease(url){
    return 'https://rd.nexusmods.com' + url.split('nexusmods.com').pop();
}

function fixRedditStuff(){
    var links = Array.prototype.slice.call(document.links, 0);
    links.filter(function(link){
        if(test(link.href)){
            var greatNewLink = getNewPagePlease(link.href);
            if(link.hasAttribute('data-outbound-url')) link.setAttribute('data-outbound-url', greatNewLink);
            link.setAttribute('href', greatNewLink);
        }
    });
}

if(test(window.location.href)){
    window.location.assign(getNewPagePlease(window.location.href));
}

window.onload = fixRedditStuff;
setInterval(fixRedditStuff, 50);