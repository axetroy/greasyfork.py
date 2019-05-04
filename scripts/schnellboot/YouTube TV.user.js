// ==UserScript==
// @name YouTube TV
// @namespace minju.s95@gmail.com
// @author schnellboot
// @description Hide Mouse on YouTube TV
// @version 1.0
// @match https://www.youtube.com/tv*
// ==/UserScript==

var timer;
var idlebreak=function(){
  document.body.style.cursor='auto';
  clearTimeout(timer);
  timer=setTimeout(function(){document.body.style.cursor='none';},3000);
};
document.documentElement.addEventListener("mousemove",idlebreak);