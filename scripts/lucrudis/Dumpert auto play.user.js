// ==UserScript==
// @name         Dumpert auto play
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Speel alle filmpjes op een pagina van dumpert.nl
// @author       lucrudis
// @match        https://www.dumpert.nl/*
// @grant        none
// ==/UserScript==

/* ----- TODOs/Improvements -----

- Stay in fullscreen
- Skip current video
- Let user pick videos
- replace setTimeout with onloaded (Technical improvement)
- Button styling
- Visible video que (Youtube like)

---------------------------------*/


(function() {
    'use strict';
    if(window.location.href.toLowerCase().includes("mediabase"))
    {
        setTimeout(function(){
            playVideo();
        }, 1200);
    }
    else
    {
        setTimeout(function(){
            createButton("Speel huidige pagina");
        }, 50);
    }
})();

function createButton(buttonText)
{
    var button = document.createElement("button");
    button.innerHTML = buttonText;
    button.onclick = buttonClicked;
    button.style.background = "green";
    button.style.position = "absolute";
    button.style.top = "2px";
    button.style.left= 0;
    button.style.padding = "4px";
    button.style.color = "white";
    var list = document.getElementsByClassName("dump-cnt")[0];
    list.style.position = "relative";
    list.appendChild(button);
}

function playVideo()
{
    if(localStorage.getItem("scriptedRedirect"))
    {
        localStorage.setItem("scriptedRedirect",false);
        var video = getCurrentVideo();
        video.play();
        setWatched(window.location.href)
        video.onended = nextVideo;
    }
}

function setWatched(url)
{
    var top15 = JSON.parse(localStorage.getItem("top15"));
    for(var video of top15)
    {
        if(video.url== url)
        {
            video.watched = true;
        }
    }
    var json = JSON.stringify(top15);
    localStorage.setItem("top15",json);
}

function nextVideo()
{
    var video = getNextVideoUrl();
    if(video!=null)
    {
        localStorage.setItem("scriptedRedirect",true);
        window.location = video.url;
    }
}

function getCurrentVideo()
{
    return document.querySelectorAll(".dump-player video[preload='none']")[0];
}

function buttonClicked()
{
    storeTop15();
    nextVideo();
}

function getNextVideoUrl()
{
    var top15 = JSON.parse(localStorage.getItem("top15"));
    for(var video of top15)
    {
        if(video.watched)
        {
            continue;
        }
        return video;
    }
    return null;
}

function storeTop15()
{
    var thumbs = document.querySelectorAll(".dumpthumb");
    var array = [];
    for (var i = 0; i < 15; i++)
    {
        var href = thumbs[i].href;
        array.push(new video(href,i))
    }
    var json = JSON.stringify(array);
    localStorage.setItem("top15",json);
    localStorage.setItem("scriptedRedirect",true);
}

function video(url,number)
{
    this.url = url;
    this.number = number;
    this.watched = false;
}