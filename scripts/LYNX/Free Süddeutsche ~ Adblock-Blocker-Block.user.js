// ==UserScript==
// @name         Free Süddeutsche ~ Adblock-Blocker-Block
// @namespace    https://greasyfork.org/de/users/228374-lynx
// @version      0.4
// @description  Blendet die bereits im Browser geladenen, aber versteckten Inhalte / Artikel der sueddeutsche.de nach kleiner Verzögerung ein.
// @author       LYNX
//               Verbesserung von / Dank an GreasyROB
// @match        https://www.sueddeutsche.de/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==
/*global $: false */

(function() {
    setTimeout(function(){
        $("div[class^='sp_message_']").remove();
        document.getElementById("sueddeutsche").style.display = "block";
        document.body.style = "overflow-y: scroll; height: " + document.body.clientHeight + "px;";
        console.log("[Free SZ] *done*");
    }, 1000);
})();
