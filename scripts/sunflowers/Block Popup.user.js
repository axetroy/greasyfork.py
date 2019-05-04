// ==UserScript==
// @name Block Popup
// @namespace Block Popup
// @include *
// @version 1
// @grant none
// @run-at document-start
// @description This script will block all popup.
// ==/UserScript==

function NoOpen(e){return 1}
parent.open=NoOpen;
this.open=NoOpen;
window.open=NoOpen;
open=NoOpen;

window.open = function(){
return;
}

open = function(){
return;
}


this.open = function(){
return;
}


parent.open = function(){
return;
} 