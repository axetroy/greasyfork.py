// ==UserScript==
// @name        WaniKani TAB Key to Info click
// @namespace   https://www.wanikani.com
// @description Binds the Item Info button to the TAB key
// @include     https://www.wanikani.com/review/session
// @include     http://www.wanikani.com/review/session
// @version     1
// @grant       none
// ==/UserScript==
// by elmeunick9

jQuery(document).on('keydown', function (event) {
  if (event.keyCode==9) {
    if ( $("#information").is(":visible") ) {
      $('#all-info').click();
    } else {
      $('#option-item-info').click();
    }
    return false;
  }
});