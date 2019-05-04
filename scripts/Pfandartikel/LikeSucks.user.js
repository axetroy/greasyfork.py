// ==UserScript==
// @name        LikeSucks
// @description Ersetzt auf boerse.to 'Gefällt mir' durch 'Danke'.
// @namespace   pfandartikel
// @include     http*://boerse.to/*
// @version     1
// @grant       none
// ==/UserScript==
var labels = document.getElementsByClassName("LikeLabel");
for (var i = 0; i < labels.length; i++) {
    labels[i].innerHTML = "Danke";
}

var texts = document.getElementsByClassName("LikeText");
for (var i = 0; i < texts.length; i++) {
    var thankText = "hat sich bedankt.";
	if(texts[i].getElementsByClassName("username").length > 1)
		thankText = "haben sich bedankt.";
	texts[i].innerHTML = texts[i].innerHTML.replace("gefällt das.", thankText);
}