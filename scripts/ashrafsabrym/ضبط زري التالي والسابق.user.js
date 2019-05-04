// ==UserScript==
// @name     ضبط زري التالي والسابق
// @version  1
// @grant    unsafeWindow
// @match    *://quran.ksu.edu.sa/*
// @description ضبط زري التالي والسابق في موقع المصحف الإلكتروني
// @namespace https://greasyfork.org/users/3687
// ==/UserScript==
let timeoutId;

const gotoPage = unsafeWindow.gotoPage;

exportFunction(dest => {
  if(timeoutId)
    clearTimeout(timeoutId);
  
  if(typeof dest == "string")
    gotoPage(dest);
  else
  {
    timeoutId = setTimeout(() => {
      gotoPage(dest);
    }, 200);
  }
}, unsafeWindow, { defineAs: "gotoPage" });