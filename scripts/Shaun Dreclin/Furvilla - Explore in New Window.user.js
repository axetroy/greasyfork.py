// ==UserScript==
// @name        Furvilla - Explore in New Window
// @namespace   Shaun Dreclin
// @description Changes the explore button to open a new window rather than a lightbox.
// @include     /^https?://www\.furvilla\.com/career/explorer/[0-9]+$/
// @version     1.3
// @grant       none
// ==/UserScript==

var id = window.location.href.split("explorer/")[1];
var old_button = document.querySelector("[data-url='/career/explore/" + id + "']");
var button = document.createElement("a");
button.className = "btn big pull-right";
button.innerHTML = "Explore";
button.href = "/career/explore/" + id;
button.target = "_blank";
old_button.parentNode.replaceChild(button, old_button);
