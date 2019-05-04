// ==UserScript==
// @name         SLAM Labor Kiosk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Will Log associate into SLAMfunction
// @author       gtwena
// @match        https://aftlite-portal.amazon.com/indirect_action
// @grant        none
// ==/UserScript==

var login= prompt( "scan badge");
if(document.getElementById('scan_name').value= login){
    document.getElementById('scan_code').value= 'SLAM'
    document.querySelector("input[type='submit']").click();
}