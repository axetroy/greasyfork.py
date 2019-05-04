// ==UserScript==
// @name         Speed up Google Captcha
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @version      1.0.1
// @license      AGLPv3
// @author       jcunews
// @description  Makes Google Captcha works faster by removing slow visual transitions and unnecessary delays.
// @match        https://www.google.com/recaptcha/api2/bframe*
// @grant        none
// ==/UserScript==

(st => {
  st = setTimeout;
  setTimeout = function(fn, dur) {
    if ([4000,50].includes(dur)) dur = 0;
    return st.apply(this, arguments);
  };
  document.head.appendChild(document.createElement("STYLE")).innerHTML = '*{transition:none!important}';
})();
