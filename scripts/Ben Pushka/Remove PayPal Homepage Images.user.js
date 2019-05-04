// ==UserScript==
// @name        Remove PayPal Homepage Images
// @namespace   english
// @description Remove PayPal Homepage Images --  http://pushka.com/coding-donation
// @include     http*://*paypal.com/au/webapps/mpp/home
// @include     http*://*paypal.com/au/webapps/mpp/home/
// @version     1.6
// @run-at document-end
// @grant       GM_addStyle

// ==/UserScript==
// Main - Reddit The Button Show Cheaters

 

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '     .row-fluid{display:none;}.moving-background-container {  background-color: #FFF;}#fixed-top{height:200px !important;}    '; /*END*/

document.getElementsByTagName('head')[0].appendChild(style);