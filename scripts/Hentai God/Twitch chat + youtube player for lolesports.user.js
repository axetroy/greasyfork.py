// ==UserScript==
// @name         Twitch chat + youtube player for lolesports
// @namespace    http://renge.life
// @version      1.0
// @description  forces twitch chat and youtube player code into the site
// @author       Hentai God
// @match        *://*.lolesports.com/*
// @grant        none
// ==/UserScript==

window.addEventListener("load", () => {

    let inte = setInterval(checkForTwitchChat, 1000);

    function checkForTwitchChat() {
        if(typeof document.getElementsByClassName("tabs")[0].children[1] == 'undefined') {

            document.getElementsByClassName("tabs")[0].innerHTML += `<li data-name="twitch-chat" class="side-nav-tab twitch-chat-tab larger-tab survey-fire" data-survey-key="twitch-chat-tab">
<a href="#panel2-3" aria-selected="true" style="display: block;" tabindex="0">Twitch Chat</a>
</li>`;

            let chat = document.createElement("DIV");
            chat.className = "content twitch-chat-container";
            chat.id = "panel2-3";
            chat.setAttribute("aria-hidden", "true");
            chat.innerHTML = '<iframe frameborder="0" scrolling="yes" class="twitch-chat-embed" src="https://www.twitch.tv/embed/riotgames/chat?darkpopout"></iframe>';

            document.getElementsByClassName("tabs-content no-bottom")[0].appendChild(chat);
            clearInterval(inte);
        }
    }
});