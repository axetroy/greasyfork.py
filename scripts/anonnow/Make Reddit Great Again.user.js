// ==UserScript==
// @name Make Reddit Great Again
// @namespace Reddit
// @match https://*.reddit.com/*
// @icon         https://www.redditstatic.com/favicon.ico
// @grant none
// @version     0.1
// @description Switches to old layout and restores old favicon
// @run-at document-start
// ==/UserScript==


//  <link rel="icon" name="old-favicon" type="image/png" href="https://www.redditstatic.com/favicon.ico">

var oldLink = document.getElementsByTagName('head')[0].querySelectorAll("link[rel='icon']");
//console.log(oldLink.length);
while(oldLink.length > 0)
{
document.getElementsByTagName('head')[0].removeChild(oldLink[0]);
oldLink = document.getElementsByTagName('head')[0].querySelectorAll("link[rel='icon']");
}

//console.log(oldLink.length);

var favicon = document.createElement('link');
favicon.type = "image/png";
favicon.rel = "icon";
favicon.href = "https://www.redditstatic.com/favicon.ico";
favicon.name = "old-favicon"
document.getElementsByTagName('head')[0].appendChild(favicon);




function test(url){
    return !!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/.*|$)/gim);
}

function getNewPagePlease(url){
    return 'https://old.reddit.com' + url.split('reddit.com').pop();
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

if(test(window.location.href)){window.location.assign(getNewPagePlease(window.location.href));}

window.onload = fixRedditStuff;
setInterval(fixRedditStuff, 50);
