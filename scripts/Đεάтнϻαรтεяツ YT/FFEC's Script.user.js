// ==UserScript==
// @name         FFEC's Script
// @namespace    http://tampermonkey.net/
// @version      1.5.3
// @description  Let's improve your Gota.io experience!
// @author       FFEC
// @match        https://gota.io/web/*
// @grant        GM_addStyle Smooth
// @contributor  Superdoggy
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @icon         https://github.com/FFEC/FFEC-s-Script/raw/master/fficon.png
// ==/UserScript==

var input = document.createElement ( " input " );
input.className = " gota-btn " ;
input.type = " button " ;
input.value = " start auto Double " ;
input.id = " start_Double " ;
input.addEventListener ( " click " , function  start () {
	document.getElementById ( " chat-body " ) .addEventListener ( " DOMNodeInserted " ,
		checkmessage, true );
}, false );