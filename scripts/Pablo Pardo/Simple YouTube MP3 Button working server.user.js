// ==UserScript==
// @name         Simple YouTube MP3 Button working server
// @namespace    
// @version      1.2.3
// @description  Adds a download button to YouTube videos which allows you to download the MP3 of the video without having to leave the page
// @author       Arari, edited by plbpardo
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

function polymerInject(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";

    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Download MP3"));

    if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null){

        document.getElementById("iframeDownloadButton").remove();

    }

    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 0";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";

    addButton.onclick = function () {

        this.remove();

        /* Add large button on click */
        var addIframe = document.createElement("iframe");
        addIframe.src = 'https://www.yt2mp3.ws/youtube-to-mp3-converter.html' 