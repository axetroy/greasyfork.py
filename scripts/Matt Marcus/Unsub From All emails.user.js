// ==UserScript==
// @name Unsub From All emails
// @description Adds a small button to unsubscribe from all the useless and pesky emails feeds from Amazon. 
// @namespace Mattwmaster58
// @match https://*.amazon.com/preferences/subscriptions/your-subscriptions/current-subscriptions*
// @grant none
// @version 0.0.1.20180502004111
// ==/UserScript==

function unsubAll(){
for (let i = 0; i < document.getElementsByClassName('a-switch-input').length; i++) {
	if (document.getElementsByClassName('a-switch-input')[i].checked) {
		document.getElementsByClassName('a-switch')[i].click();
	}
}}

document.getElementsByClassName('a-spacing-medium')[0].outerHTML += '<input id="unsub-all" type="button" value="Unsubscribe from all"/>'

document.getElementById('unsub-all').addEventListener('click', function(){unsubAll()});