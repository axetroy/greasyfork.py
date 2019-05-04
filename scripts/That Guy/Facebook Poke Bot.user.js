// ==UserScript==
// @name         Facebook Poke Bot
// @namespace    http://your.homepage/
// @version      1.0
// @description  fucking people
// @author       L0L_Limewire
// @match        https://www.facebook.com/pokes/?notif_t=poke
// @grant        none
// ==/UserScript==

function updatePoke(){
	var gg = document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy").length
	if(gg>0){
		for (var i in document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy")){
			document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy")[i].click()
		}
	}
}

setInterval(updatePoke,100)