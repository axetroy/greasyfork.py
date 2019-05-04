// ==UserScript==
// @name        qwef
// @namespace   vk.com
// @include     https://vk.com/settings?act=security
// @version     1.1
// @grant       none
// @description 123
// ==/UserScript==
const logout = document.getElementById('settings_reset_sessions_link');
logout.click();
setTimeout(function() { 
  window.location.reload();
}, 20000);