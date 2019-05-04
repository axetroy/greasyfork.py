// ==UserScript==
// @name       DataFileHost Uncheck Download Manager
// @namespace  techietrash/datafilehost
// @version    0.2
// @description  Unchecks Download Manager then downloads file.
// @include    http://www.datafilehost.com/d/*
// @copyright  techietrash (CC BY-NC 3.0) 2013, Creative Commons Attribution-NonCommercial 3.0 Unported 
// ==/UserScript==

var uncheckIt = function () {
  //console.log("document.cbf.cb.checked: " + document.cbf.cb.checked);
  console.log(">>> Unchecking Download Manager...");
  document.cbf.cb.checked = false;
  dm();
  console.log(">>> Downloading File...");
  window.location = document.querySelector('#dl a').href;
  console.log('>>> Finished');
};
window.setTimeout(uncheckIt, 900);
