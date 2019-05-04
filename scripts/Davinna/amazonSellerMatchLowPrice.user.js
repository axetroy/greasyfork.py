// ==UserScript==
// @name         amazonSellerMatchLowPrice
// @namespace    https://greasyfork.org/users/98044
// @version      1.1
// @description  Will refresh "Manage  Inventory" page every 16mins, click all "Match Low Price" buttons,
// @description  then all the "Save" buttons.
// @author       Davinna
// @icon         https://turkerhub.com/data/avatars/l/0/594.jpg?1485199123
// @include      *sellercentral.amazon.com/inventory?viewId=PRICING*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @license      https://opensource.org/licenses/MIT
// @copyright    2017-2018 Davinna
// ==/UserScript==
$(document).ready(function(){
  'use strict';
  setInterval(function(){matchLowPrice()}, 60000);//every minuite
  setInterval(function(){pageReload()}, 300000);//every 5 minutes
});

function matchLowPrice() {
  const $matchLowPriceButtons = $('button span.a-dropdown-prompt:visible');
  for (var i = 0; i < $matchLowPriceButtons.length; i++) {
    $matchLowPriceButtons[i].click();
  }
  //console.log('clicked');
}

function pageReload() {
  //console.log('reloaded');
  window.location.reload(true);
}
