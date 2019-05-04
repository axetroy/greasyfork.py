// ==UserScript==
// @name         Cuyler's Soul-Anime Page Simplifier
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Press "Escape" to hide the (sometimes) annoying stuff that aren't technically ads and your ad-blocker doesn't block.
// @author       Cuyler
// @include      *.soul-anime.us/*
// @require      http://code.jquery.com/jquery-3.2.1.slim.min.js
// @grant        none
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

var foundTheStuffToJunk = false;
var trashedTheJunk = false;

var timeoutFunc;

const CHECK_INTERVAL_MS = 1000;

(function() {
    'use strict';
    // Your code here...
    console.log("Running Soul Anime userscript");
    
    appendAntiSpoiler();

    timeoutFunc = setTimeout(respondToTimeout,CHECK_INTERVAL_MS);

    document.addEventListener("keydown", respondToKeypress);
})();

function respondToKeypress(e) {
    if(e.keyCode == 27) {removeShit();}
}

function respondToTimeout() {

    console.log("searching for stuff to destroy...");

    if(!foundTheStuffToJunk) {
        let foundDetails = $("#details");

        if(foundDetails) {
            foundTheStuffToJunk = true;
        }
    }

    if(foundTheStuffToJunk && (!trashedTheJunk)) {

        removeShit();
        clearTimeout(timeoutFunc);

        trashedTheJunk = true;
    }
}

function removeShit() {
    $("br").remove();
    $('iframe[height="360px"]').remove();
    $("#googleplay").remove();
    $("#bg_cover").remove();
    $("img[alt='Soul-Anime']").remove();
    $("#CV_BG").remove();
    $("#bg_footer").remove();
    $("#salapers").remove();
    $("#details").remove();
    $("#bg_head").remove();
    $("#schema").remove();
    $("#bg_nav").remove();
    $("#anime_info").remove();
    $("#schemu").remove();

    console.log("destroyed.");
}

function createAntiSpoilerDiv(width, height) {

    var antiSpoilerDiv = document.createElement("DIV");
    antiSpoilerDiv.style.position = "absolute";
    antiSpoilerDiv.style.zIndex = Number.MAX_SAFE_INTEGER;
    antiSpoilerDiv.style.backgroundColor = "black";
    antiSpoilerDiv.style.color = "white";
    antiSpoilerDiv.style.width = width + "px";
    antiSpoilerDiv.style.height = height + "px";
    antiSpoilerDiv.style.left = "0px";
    antiSpoilerDiv.style.top = "0px";
    antiSpoilerDiv.innerHTML = "<strong>ANTI SPOILER</strong>" + 
        "<p>This box was inserted by Cuyler's Soul-Anime Page Simplifier to block video thumbnails that might function as spoilers.</p>" +
        "<p>For example, if the video preview shows someone alive who we thought was dead, that spoils some of the fun of the episode.</p>" +
        "<p>This often turns out to be <strong>particularly</strong> problematic for anyone who tends to download the shows before watching them.</p>" +
        "<p>Click it to see the video preview.</p>";

    antiSpoilerDiv.addEventListener('click', function() {this.parentElement.removeChild(this);});

    return antiSpoilerDiv;
}

function appendAntiSpoiler() {

    var vidDiv = document.querySelector("#vid");
    
    if(vidDiv) { vidDiv.appendChild(createAntiSpoilerDiv(640,710)); }
}