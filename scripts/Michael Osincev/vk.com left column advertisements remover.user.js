// ==UserScript==
// @name     vk.com left column advertisements remover
// @namespace mikeos
// @description Removes VK.COM ad panel.
// @version  1
// @grant    none
// @include  *vk.com*
// ==/UserScript==

var style = document.createElement("style");
style.innerHTML = "#ads_left{display:none!important}";
document.getElementsByTagName("head")[0].appendChild(style);
