// ==UserScript==
// @name         bitcointalk ICO 过滤
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  none
// @author       hearinleaf
// @match        https://bitcointalk.org/index.php*
// @grant        none
// @license      MIT License
// ==/UserScript==
window.onload=function(){
ii=document.getElementsByClassName("leftimg").length;
for (var i=0; i<ii; i=i+2)
  {
  tmp = document.getElementsByClassName("leftimg")[i].parentNode.childNodes[5].innerText;
      if (tmp.match(/ICO/i) || tmp.match(/SALE/i) || tmp.match(/AIRDROP/i) !== null) {
          document.getElementsByClassName("leftimg")[i].parentNode.childNodes[5].innerText = "GOOD DAY";
      }
  }
};
