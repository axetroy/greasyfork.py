// ==UserScript==
// @name         [HFR] Check ban
// @icon         http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @version      0.4
// @description  Vérifie si un message a été alerté au survol du pointeur sur l'icone de modération
// @author       Garath_
// @include      https://forum.hardware.fr/*
// @grant        GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/70059
// ==/UserScript==

function checkBan(link)
{
    var listener = function()
    {
        GM_xmlhttpRequest({
            method : "GET",
            url : link.href,
            onload : function (response) {
                link.removeEventListener("mouseover", listener);

                var page = document.createElement('html');
                page.innerHTML = response.responseText;
                var el = page.querySelector("div.hop");

                if (el == null)
                {
                    link.innerHTML = "<img src=\"https://forum-images.hardware.fr/images/perso/o_non.gif\" alt=\"Faire la poucave ?\">";
                    link.title = "Faire la poucave ?";
                }
                else
                {
                    link.innerHTML = "<img src=\"https://forum-images.hardware.fr/images/perso/tt4.gif\" alt=\"Le message a déjà été alerté. Voulez-vous vous joindre à la curée ?\">";
                    link.title = "Le message a déjà été alerté. Voulez-vous vous joindre à la curée ?";
                }
            }
        });
    };

    link.addEventListener("mouseover", listener);
}


var links = document.getElementById("mesdiscussions").querySelectorAll(
    "table.messagetable td.messCase2 div.toolbar div.right > a[target=_blank] ");
for(let link of links)
{
    checkBan(link);
}