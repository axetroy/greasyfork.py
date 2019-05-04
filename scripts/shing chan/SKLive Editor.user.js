// ==UserScript==
// @name         SKLive Editor
// @namespace    undefined
// @version      0.2
// @description  Modify SKLive Layout
// @author       Shing
// @match        *://live.sk-knower.com/*
// @run-at       document-start
// ==/UserScript==

window.onload = function() {
    // Dark Mode of Twitch Chat
    var chat = document.getElementById("chat_ttv");
    if (chat === null) {
        console.log("No embedded chat");
    } else {
        var src_origin = chat.src;
        var isTwitchChat = src_origin.toLowerCase().includes("twitch");
        if (isTwitchChat === true) {
            // have parmeter
            if (src_origin.includes("?")) {
                chat.src = src_origin + "&darkpopout";
            }
            // no parmeter
            else {
                chat.src = src_origin + "?darkpopout";
            }
            console.log("Twitch chat is in dark mode");
        } else {
            console.log("Other chat is detected and do nothing");
        }
    }

    // Extend chat window height
    var chat_entire = document.getElementById("wh");
    chat_entire.style.height = "100vh";

    // Remove AdBlock Suggestion
    var popUp = document.getElementById("asuggest");
    if (popUp === null) {
        console.log("No adBlock suggestion");
    } else {
        closeadbsuggest();
        console.log("AdBlock suggestion popup is removed");
    }
}