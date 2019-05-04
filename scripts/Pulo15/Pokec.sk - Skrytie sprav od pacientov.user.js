// ==UserScript==
// @name           Pokec.sk - Skrytie sprav od pacientov
// @namespace      http://
// @description    Skrytie sprav na skle od neziadanych pacientov.
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @icon           http://s.aimg.sk/pokec_base/css/favicon.ico
// @author         MaxSVK
// @edit           Pulo15
// @version        1.3
// @date           2016-September-20
// @license        MIT
// ==/UserScript==


//--- zoznam pacientov ---
var blockedNicks = new Array("tuIi17", "tuli17"); // tuIi17 a tuli17 ponechat !!! ( dalsie nicky oddelovat ciarkou a davat do uvodzoviek )
//--- zoznam pacientov ---

function hideMessage(currentNode)
{
	currentNode.parentNode.style.display = "none";
}

var sklo = document.getElementById("sklo");
sklo.addEventListener("DOMNodeInserted", function(event) {

	var nodes;
	var currentNick;

	nodes = event.relatedNode.getElementsByClassName("dt");

	for(var i = 0; i < nodes.length; i++) {
		currentNick = nodes[i].getElementsByTagName("a")[1].innerHTML;
		if(blockedNicks.indexOf(currentNick) > -1) {
		hideMessage(nodes[i]);
		}
	}

	nodes = event.relatedNode.getElementsByClassName("dd");

	for(var p = 0; p < nodes.length; p++) {
		currentNick = nodes[p].getElementsByClassName("meno")[0].innerHTML;
		if(blockedNicks.indexOf(currentNick) > -1) {
		hideMessage(nodes[p]);
		}
	}

}, true);