// ==UserScript==
// @name         Facebook AutoPoke
// @version      1.0
// @description  Poke your friends autonomously! I can add a time "randomiser" if requested.
// @author       Zackton
// @match        https://www.facebook.com/pokes/?show_outgoing=0
// @match        https://www.facebook.com/pokes/?notif_t=poke
// @grant        none
// @start-at     document-end
// @namespace https://greasyfork.org/users/8935
// ==/UserScript==

function tryPoke(){
    if(document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy").length > 1) {
	for(i = 1; i < document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy").length; ++i) {
            if(document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy")[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == "") {
	            document.getElementsByClassName("_42ft _4jy0 _4jy3 _4jy1 selected _51sy")[i].click();
            }
        }
    }
}

setInterval(tryPoke, 100);