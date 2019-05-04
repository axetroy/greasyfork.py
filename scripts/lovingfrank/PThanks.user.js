// ==UserScript==
// @name            PThanks
// @author          limbo
// @version         0.992
// @description   PT站自动感谢拿积分
// @match           http://*/details.php*
// @match           https://*/details.php*
// @match           http://*.im/t*
// @match           https://*.im/t*
// @match           http://*/plugin_details.php*
// @match           https://*/plugin_details.php*
// @match           http://*/*page=torrent-details&id=*
// @match           https://*/*page=torrent-details&id=*

// @namespace https://greasyfork.org/users/25324
// ==/UserScript==

function thanks(){
if(document.getElementById("ajaxthanks"))
document.getElementById("ajaxthanks").click();
if(document.getElementById("saythanks"))
document.getElementById("saythanks").click(); 
if(document.getElementById("thanksbutton"))
document.getElementById("thanksbutton").click();
if(document.getElementById('thanks_div'))
document.getElementById('thanks_div').click();
}

setTimeout(thanks,200);