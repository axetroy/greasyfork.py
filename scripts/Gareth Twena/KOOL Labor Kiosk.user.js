// ==UserScript==
// @name         KOOL Labor Kiosk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Will Log associate into KOOL function
// @author       gtwena
// @match        https://aftlite-portal-eu.amazon.com/indirect_action
// @grant        none
// ==/UserScript==

var login= prompt( "scan badge");
if(document.getElementById('scan_name').value= login){
    document.getElementById('scan_code').value= 'KOOL'
    document.querySelector("input[type='submit']").click();
}