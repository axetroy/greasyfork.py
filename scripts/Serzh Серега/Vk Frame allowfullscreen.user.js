// ==UserScript==
// @name        Vk Frame allowfullscreen
// @description Vk Frame allowfullscreen.
// @namespace   VkFrameAllowfullscreen@userscript
// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==

// 2016-02-01



(function() {

var iframe11 = document.getElementsByTagName('iframe');

for (var i = 0; i < iframe11.length; i++) {
if (/vk.com\/video_ext.php/.test(iframe11[i].src))
{

iframe11[i].setAttribute("allowfullscreen", "true");
}
} 




})();