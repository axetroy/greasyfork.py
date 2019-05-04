// ==UserScript==
// @name        alipay-hide-cvv2
// @namespace   hypermedia
// @include     https://*alipay*
// @description alibaba aliexpress alipay hide secure CVV2 data
// @version     1
// @grant       none
// ==/UserScript==



document.getElementsByName("cvv2")[0].type="password";
