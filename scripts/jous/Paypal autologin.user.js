// ==UserScript==
// @name        Paypal autologin
// @namespace   paypal_jump_to_login
// @description Presses the 'Log in' button if the credentials are already filled. 
// @include     https://www.paypal.com/signin*
// @include     https://www.paypal.com/fi/signin*
// @version     0.3.1
// @grant       none
// ==/UserScript==

var target_button = document.getElementById('btnLogin');
var username = document.getElementById('btnLogin');
var password = document.getElementById('password');
var retry_time = 500;
var tries = 0;

function click_target_button() {
  if (username.value != '' && password.value != '') {
    target_button.click();
  } else {
    console.log("Username or password was not given... Tried " + tries + " times.");
    setTimeout(click_target_button, retry_time);
  }
}

setTimeout(click_target_button, retry_time);