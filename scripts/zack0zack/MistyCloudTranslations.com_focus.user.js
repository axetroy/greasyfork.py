// ==UserScript==
// @name        MistyCloudTranslations.com_focus
// @version     1
// @namespace   zack0zack
// @description MistyCloudTranslations.com auto-Focus
// @include     *mistycloudtranslations.com/gdbbm-c*
// @grant       none
// ==/UserScript==



window.addEventListener("load",function() {
	document.getElementById('site-navigation').parentNode.removeChild( document.getElementById('site-navigation') );
},true)
