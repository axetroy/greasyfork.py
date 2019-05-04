// ==UserScript==
// @name         JVC Post Noelshack Direct Link
// @namespace    JVC Post Noelshack Direct Link
// @version      1.0.0
// @description  Convertit automatiquement toute image NoelShack vers son lien direct avant de poster un message.
// @match        http://www.jeuxvideo.com/forums*
// @match        http://www.jeuxvideo.com/messages*
// @match        https://www.jeuxvideo.com/forums*
// @match        https://www.jeuxvideo.com/messages*
// @grant        none
// ==/UserScript==

function fixNoelShackLinks() {
    var messageTopic = document.getElementById("message_topic");
    var text = messageTopic.value;
    text = text.replace(/\b(?:https?:\/\/)?www\.noelshack\.com\/(\d{4})-(\d{0,2})-(\d{0,2})-(\d+)-([\w-]+)\.(\w+)\b/gi, "https://image.noelshack.com/fichiers/$1/$2/$3/$4-$5.$6");
    text = text.replace(/\b(?:https?:\/\/)?www\.noelshack\.com\/(\d{4})-(\d{0,2})-(\d+)-([\w-]+)\.(\w+)\b/gi, "https://image.noelshack.com/fichiers/$1/$2/$3-$4.$5");
    messageTopic.value = text;
}

var button = document.getElementsByClassName("btn-poster-msg")[0];
button.addEventListener("click", fixNoelShackLinks, true);
