// ==UserScript==
// @name         Numoney Price Logger
// @description  Logs the updated BTC price on numoney.store into the console for easy pasting
// @version      1
// @match        https://numoney.store
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @namespace https://greasyfork.org/users/160665
// ==/UserScript==

$(document).ready(function(){
  f=function(s){return $('#btc-'+s+'-price').find('.price').text();};
  setInterval(function(){
    sell=f('sell');buy=f('buy');
    console.log('Buy: ' + buy + ', Sell:' + sell);
  }, 5000);
});