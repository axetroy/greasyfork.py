// ==UserScript==
// @name         Go to Graph button
// @namespace    MALgraphGo
// @version      1.2
// @description  a quick way to open a user's anime graph profile from their MAL profile
// @author       Samu
// @match        https://myanimelist.net/profile/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    var url = document.location.href;
    var matchUsername = url.match(/\/profile\/([a-zA-Z0-9_-]{2,16})/);
    var nameEl = document.querySelector("[name='profileUsername']");
    // check if username is available on the page, otherwise get it from url, otherwise empty
    var username = nameEl && nameEl.value || matchUsername && matchUsername[1] || "";
    var url = "https://graph.anime.plus/" + username;
    var graphButton = document.createElement("a");
    var userButtons = document.querySelector("#content .user-profile .user-button");

    /*if (matchUsername && typeof matchUsername[1] === "string") {
        username = matchUsername[1]
    }*/

    graphButton.href = url + "?referral=search";
    graphButton.className = "btn-profile-submit";
    graphButton.innerText = "Graph";
    graphButton.setAttribute("style", "width: 100%;margin-top: 4px;");
    graphButton.setAttribute("target", "_blank");

    if (userButtons) {
      userButtons.appendChild(graphButton);

      graphButton.addEventListener("click", function() {
        GM_xmlhttpRequest({
          method: "GET",
          url: url + "/queue-add"
        });
      });
    }

})();