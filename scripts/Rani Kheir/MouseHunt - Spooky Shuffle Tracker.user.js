// ==UserScript==
// @name         MouseHunt - Spooky Shuffle Tracker
// @author       Rani Kheir
// @namespace    https://greasyfork.org/users/4271-rani-kheir
// @version      1.7
// @description  Make playing Spooky Shuffle more tolerant by keeping track of what you've already uncovered
// @include      http://www.mousehuntgame.com/index.php
// @include      https://www.mousehuntgame.com/index.php
// @include      http://www.mousehuntgame.com/
// @include      https://www.mousehuntgame.com/
// @include      http://www.mousehuntgame.com/inventory.php?tab=special
// @include      https://www.mousehuntgame.com/inventory.php?tab=special
// @include      http*://www.mousehuntgame.com/canvas*
// @include      http*://www.mousehuntgame.com/item.php?item_type=2014_spooky_shuffle_admission_ticket_stat_item
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Thanks to John Culviner's answer here:
    // https://stackoverflow.com/a/27363569/3882583
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        //console.log('request started!');
        this.addEventListener('load', function() {
            var x = JSON.parse(this.responseText);
            if (x.memory_game != undefined) {

            var cards = x.memory_game.cards;
            var len = x.memory_game.cards.length;

            if (document.getElementById("card-hack-0"))
            {
                for (var i = 0; i < len; i++) {
                    if (x.memory_game.cards[i].name !== "?")
                    {
                        var ele = document.getElementById("card-hack-" + i);
                        ele.style.color = "green";
                        ele.firstChild.innerHTML  = x.memory_game.cards[i].name;
                    }
                }
            }
            else
            {
                for (var i = 0; i < len; i++) {
                    var divElement = document.createElement("Div");
                    divElement.id = "card-hack-" + i;
                    divElement.style.marginLeft = "12px";
                    divElement.style.textAlign = "center";
                    divElement.style.fontWeight = "bold";
                    divElement.style.fontSize = "smaller";
                    var paragraph = document.createElement("P");
                    var text = document.createTextNode("-----");
                    paragraph.appendChild(text);
                    divElement.appendChild(paragraph);
                    document.querySelector("[data-card-id='" + i + "']").appendChild(divElement);
                }
            }
        }
        });
        origOpen.apply(this, arguments);
    };
})();
