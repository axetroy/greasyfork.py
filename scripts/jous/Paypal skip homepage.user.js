// ==UserScript==
// @name        Paypal skip homepage
// @namespace   paypal_jump_to_login
// @description Skips the home page and goes straight to the login page
// @include     https://www.paypal.com/*/home
// @version     0.1
// @grant       none
// ==/UserScript==

document.location = 'https://www.paypal.com/signin?country.x=US&locale.x=en_US';
