// ==UserScript==
// @name        Topup Card-chan killer
// @namespace   topupcardchankiller
// @description kill that topupcardchan
// @include     http*://*.aprts-games.com/player
// @version     3
// @grant       none
// ==/UserScript==


function blocktopupcardchan() {
var cfi = document.getElementsByClassName("chat_faction_item")

for (var i =  cfi.length - 1; i >= 0; i--) {
if (cfi[i].innerHTML.indexOf("Topup") != -1) {
cfi[i].style.display = 'none'
}

}
}

setInterval(blocktopupcardchan, 1000);