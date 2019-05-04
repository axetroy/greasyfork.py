// ==UserScript==
// @name           9gag.com video controls on hover (including Firefox new Tab fix)
// @namespace      exzentrik.net
// @description    Show video controls on mouse hover, fixes the Firefox-Issue of opening an empty new tab on click. 
// @include        https://9gag.com/*
// @grant          none
// @version        0.0.2
// ==/UserScript==

document.onmouseover = function(e){
 if (e.target.tagName == 'VIDEO'){
  e.target.setAttribute("controls", true);
  e.target.parentNode.parentNode.removeAttribute("target");
 }
};