// ==UserScript==
// @name         auto click 
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  auto click pay button
// @match        https://buy.tmall.com/*
// @author       peter
// @grant        none
// ==/UserScript==

//setTimeout(beginclick,30000);

window.onload=function(){

  setInterval(autoClick,100);

}
function autoClick(){   
  if(document.getElementsByClassName("go-btn").length>0){
  document.getElementsByClassName("go-btn")[0].click();
}
}
