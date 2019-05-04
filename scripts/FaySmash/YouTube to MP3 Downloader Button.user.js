// ==UserScript==
// @name         YouTube to MP3 Downloader Button
// @description  Adds a download button to YouTube videos which allows you to download the MP3 of the video with MediaHuman YouTube to MP3
// @author       FaySmash
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// @version      1.3
// @namespace    youtube.to.mp3.downloader.button
// ==/UserScript==
function polymerInject() {

    /* Create button */
    var buttonDiv = document.createElement("div");
    
    buttonDiv.id = "downloadButton";

    var subscribeButton = document.querySelectorAll("paper-button.ytd-subscribe-button-renderer");
    subscribeButton[0].style.display = "initial";
    subscribeButton[0].style.width = "200px";
    
    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Download MP3"));


    addButton.style.width = "200px";
    addButton.style.position = "relative";
    addButton.style.boxSizing = "border-box";
    addButton.style.minWidth = "5.14em";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 16px";
    addButton.style.margin = "auto 4px";
    addButton.style.border = "0";
    addButton.style.borderRadius = "2px";
    addButton.style.cursor = "pointer";
    addButton.style.color = "hsla(0, 0%, 6.7%, .6)";
    addButton.style.fontSize = "1.4rem";
    addButton.style.fontFamily = "inherit";
    addButton.style.fontStyle = "inherit";
    addButton.style.fontWeight = "500";
    addButton.style.textTransform = "uppercase";
    addButton.style.letterSpacing = "0.007px";
    addButton.onclick = function() {
	
        s = document.selection ? document.selection.createRange().text : document.getSelection();
        document.location.href = 'yt2mp3://' + (location.href);

    };

    buttonDiv.appendChild(addButton);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for (var i = 0; i < targetElement.length; i++) {

        if (targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1) {

            targetElement[i].appendChild(buttonDiv);

        }

    }

}




setInterval(function() {


    if (document.getElementById("count") && document.getElementById("downloadButton") === null)

        polymerInject();




}, 100);




standardInject();