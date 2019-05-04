// ==UserScript==
// @name         Geoguessr Hack
// @namespace    http://halilceyhan.com/
// @version      0.1
// @description  Kurun Oyunu çalıştırın sonra hep ekranı yenileyin
// @author       HALİL CEYHAN
// @match        https://www.geoguessr.com/*
// @match        http://www.geoguessr.com/*
// @grant        none
// ==/UserScript==
var oldXHROpen = window.XMLHttpRequest.prototype.open;
window.isPost = false;
window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
 this.addEventListener('load', function() {
  try{
      window.isPost = !window.isPost;
      if(window.isPost){
      var position = JSON.parse(this.responseText).rounds.slice(-1)[0];
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", this.responseURL);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify({"lng":position.lng,"lat":position.lat,"localTime":new Date().toISOString()}));
      }
  }catch(r){

  }


 });
 return oldXHROpen.apply(this, arguments);
}