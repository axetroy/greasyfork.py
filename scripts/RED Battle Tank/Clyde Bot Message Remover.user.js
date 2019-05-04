// ==UserScript==
// @name         Clyde Bot Message Remover
// @namespace    https://discordapp.com
// @version      0.1
// @description  Hides all messages from Clyde Bot in Discord web app.
// @author       RED Battle Tank#1415
// @match        https://discordapp.com
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==
(function() {
    var styleElement = document.createElement("style");
    styleElement.innerHTML = ".is-local-bot-message { display: none; }";
    document.head.appendChild(styleElement);
})();
