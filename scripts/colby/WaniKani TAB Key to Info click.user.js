// ==UserScript==
// @name        WaniKani TAB Key to Info click
// @namespace   https://www.wanikani.com
// @description Binds the Item Info button to the TAB key
// @include     https://www.wanikani.com/review/session
// @include     http://www.wanikani.com/review/session
// @version     1
// @grant       none
// ==/UserScript==
// by that other guy, updated to include event.preventDefault() so it actually works

jQuery(document).on('keydown', function (event) {

  if (event.keyCode==9) {
      event.preventDefault();
    if ( $("#information").is(":visible") ) {
      $('#all-info').click();
    } else {
      $('#option-item-info').click();
    }
    return false;
  }
});