// ==UserScript==
// @name Remove Coursehero Monthly Limit
// @description Removes the Coursehero monthly document preview limit (originally 3).
// @author Luigi Agcaoili
// @include *coursehero.com/file/*
// @version 1.0.0
// @grant none
// @namespace https://greasyfork.org/users/208370
// ==/UserScript==
// remove dynamically added styles
document.body.className = '';
document.body.style.overflow = 'scroll';
// wait for element to load before removing it
const checkExist = setInterval(() => {
  if (document.querySelector('.mfp-wrap')) {
      document.querySelector('.mfp-wrap').remove();
      document.querySelector('.mfp-bg').remove(); 
      clearInterval(checkExist);
  }
}, 100);