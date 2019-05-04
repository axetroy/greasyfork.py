// ==UserScript==
// @name        Linksys SmartWifi
// @namespace   zefie.linksys.smartwifi
// @description Auto login to smart wifi
// @include     http://192.168.*/ui/dynamic/guest-login.html*
// @version     1
// @grant       none
// ==/UserScript==
var password="BeMyGuest"
window.onload = function(){
  document.getElementById('guest-pass').value = password;
  document.getElementById('submit-login').click();
}
