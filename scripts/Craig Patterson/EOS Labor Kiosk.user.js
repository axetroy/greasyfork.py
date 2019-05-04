
// ==UserScript==
// @name         EOS Labor Kiosk
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Will Log associate into End of Shift function
// @author       cpatters
// @match        https://aftlite-portal.amazon.com/indirect_action
// @grant        none
// ==/UserScript==

var login= prompt( "Scan Badge to Log Into End Of Shift");
if(document.getElementById('scan_name').value= login){
    document.getElementById('scan_code').value= 'EOS'
    document.querySelector("input[type='submit']").click();
}