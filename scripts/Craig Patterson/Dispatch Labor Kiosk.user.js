// ==UserScript==
// @name         Dispatch Labor Kiosk
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Will Log associate into dispatch function
// @author       cpatters
// @match        https://aftlite-portal.amazon.com/indirect_action
// @grant        none
// ==/UserScript==

var login= prompt( "scan badge");
if(document.getElementById('scan_name').value= login){
    document.getElementById('scan_code').value= 'dispatch'
    document.querySelector("input[type='submit']").click();
}