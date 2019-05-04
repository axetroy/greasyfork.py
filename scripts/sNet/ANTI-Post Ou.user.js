// ==UserScript==
// @name         ANTI-Post Ou
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.jeuxvideo.com/*
// @grant        none
// ==/UserScript==

antipostou = function() { 
    var lien = document.querySelectorAll(".lien-jv.topic-title");
    for (i=0;i<lien.length;i++) { 
        let current_lien = lien[i];
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var nouvDoc = document.implementation.createHTMLDocument().documentElement;
                nouvDoc.innerHTML = xmlHttp.responseText;
                var messageTopic = nouvDoc.querySelectorAll('.bloc-message-forum ');
                if (messageTopic[0].innerHTML.match(/post ou/gi)) {
                    current_lien.style.cssText = 'color:#c14242 !important';
                }
            }
        };
        xmlHttp.open("GET", current_lien.href, true);
        xmlHttp.send(null);
    }
};
window.onload = antipostou();