// ==UserScript==
// @name         Random Anime on MAL
// @description  finds random anime
// @match        https://myanimelist.net/*
// @version      0.1
// @author       SentientCrab
// @namespace https://greasyfork.org/users/49589
// ==/UserScript==

var randomURL;
const RATE_LIMIT=500;//in ms change if you keep getting rate limited;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timedDownload() {
  return new Promise(resolve => {
    setTimeout(() => {
        randomURL="/anime/"+Math.floor(Math.random() * 36800 );
        var myRequest = new Request(randomURL);
        fetch(myRequest).then(function(response) {
            resolve(response.ok);
        });
    }, RATE_LIMIT);
  });
}

async function asyncCall() {
    var worked=false;
    do
    {
        worked=await timedDownload();
    }while(!worked);
    var menu=document.getElementById("menu_left").children[0].children[0].children[1];
    menu.innerHTML+='<li><a href="'+randomURL+'">Random</a></li>';
}

(function() {
    if(document.getElementById("menu_left")!=null)
    {
        asyncCall();
    }
})();