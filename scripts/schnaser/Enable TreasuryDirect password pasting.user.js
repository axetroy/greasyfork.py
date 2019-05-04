// ==UserScript==
// @name        Enable TreasuryDirect password pasting
// @namespace   schnaser.com
// @description Enable pasting in TreasuryDirect password input box. Useful for those of us that use password managers
// @include     https://www.treasurydirect.gov/RS/PW-Display.do
// @version     1
// @grant       none
// ==/UserScript==

Array.from(document.getElementsByClassName('pwordinput'))
  .forEach(function(elem){
       elem.removeAttribute('readonly');
  }
);