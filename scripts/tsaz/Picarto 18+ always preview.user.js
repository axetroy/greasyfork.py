// ==UserScript==
// @name        Picarto 18+ always preview
// @namespace   Anonymous
// @description makes it so you don't have to hover
// @include     https://www.picarto.tv/live/explore.php
// @version     1
// @grant       none
// ==/UserScript==

function do_hover() {
  var channels = $('[class^="maskchannel"]')
  channels.trigger("onmouseover");
  channels.attr("onmouseout", null);
}

var container = document.getElementById("container");
var observer = new MutationObserver(do_hover);
observer.observe(container, {childList: true});
