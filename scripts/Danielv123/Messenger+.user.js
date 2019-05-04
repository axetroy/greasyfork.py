// ==UserScript==
// @name         Messenger+
// @namespace    DanielVestol.Messenger
// @description  Improves the facebook messenger desktop experience
// @include      https://www.messenger.com/*
// @author       Daniel Vestol
// @version      1.1
// @grant        none
// ==/UserScript==
console.log('Userscript: Messenger+')
document.addEventListener("DOMContentLoaded", function(event) {
  console.log('DOMContentLoaded')
  setInterval(function() {document.getElementsByClassName('_s15')[0].style.display = 'none';}, 5000);
});