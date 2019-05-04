// ==UserScript==
// @version         2.0.2
// @name            YouTube MP3 Download | convert2mp3.net | Edge, Firefox, Chrome, Safari, Opera...
// @name:en         YouTube MP3 Download | convert2mp3.net | Edge, Firefox, Chrome, Safari, Opera...
// @author			InvisibleQuantum
// @namespace       https://www.youtube.com/user/InvisibleQuantum/
// @description     Fügt einen MP3 Download-Button zur Videoseite hinzu, um das Video über convert2mp3.net zu MP3 umzuwandeln.
// @description:en  Simple YouTube MP3 download button for "convert2mp3.net"-service
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @compatible      safari
// @icon            http://convert2mp3.net/favicon.ico
// @match           http*://www.youtube.com/*
// @include      	http*://*.youtube.com/*
// @include      	http*://youtube.com/*
// @include      	http*://*.youtu.be/*
// @include      	http*://youtu.be/*
// @run-at       	document-end
// @homepageURL     https://www.youtube.com/user/InvisibleQuantum/
// @supportURL      https://www.youtube.com/user/InvisibleQuantum/discussion
// @contributionURL https://www.youtube.com/user/InvisibleQuantum?sub_confirmation=1
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright   	2017-06-15 // InvisibleQuantum
// @license         CC BY-SA
// @license         https://creativecommons.org/licenses/by-sa/4.0
// ==/UserScript==
function polymerInject() {

    /* Create button */
    var buttonDiv = document.createElement("div");

    buttonDiv.id = "downloadButton";

    var subscribeButton = document.querySelector("#subscribe-button paper-button");
    subscribeButton.style.display = "initial";
    subscribeButton.style.width = "170px";

    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Convert2mp3"));


    addButton.style.width = "170px";
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


        javascript:(function() { var vid = document.location.href; if (vid.indexOf('youtube.com')<0) { vid = window.prompt('Youtube url'); } if (vid && vid.indexOf('youtube.com')) { window.open('http://convert2mp3.net/addon_call.php?format=mp3&url=' + vid); } else { alert(''); }})();

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