// ==UserScript==
// @name:de        Steam: Geschenke an Freunde senden, die das Spiel bereits besitzen
// @name           Steam: Send gifts to friends who already own them
// @namespace      http://store.steampowered.com/
// @description:de Erlaubt es dir, Steam-Geschenke an Freunde zu senden, die das Spiel bereits besitzen.
// @description    Allows you to send Steam gifts to friends even if they already own it.
// @match          https://store.steampowered.com/checkout/sendgift/*
// @match          https://store.steampowered.com/checkout/?purchasetype=gift
// @include        https://store.steampowered.com/checkout/sendgift/*
// @include        https://store.steampowered.com/checkout/?purchasetype=gift
// @version        1.1
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function () {
	"use strict";

	var radioButtons = document.getElementsByName("friend_radio");

	for (var i = 0, l = radioButtons.length; i < l; i++) {
		radioButtons[i].disabled = false;
	}
})();
