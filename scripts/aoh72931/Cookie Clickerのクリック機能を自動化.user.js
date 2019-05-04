// ==UserScript==
// @name         Cookie Clickerのクリック機能を自動化
// @namespace    https://twitter.com/aoh72931
// @version      1.8
// @description  Cookie Clicker Auto click
// @author       aoh72931
// @match        http://orteil.dashnet.org/cookieclicker/
// @match        http://orteil.dashnet.org/cookieclicker/*
// @match        http://natto0wtr.web.fc2.com/CookieClicker/
// @match        http://natto0wtr.web.fc2.com/CookieClicker/*
// @match        http://web.archive.org/web/*/http://orteil.dashnet.org/cookieclicker/*
// @match        https://web.archive.org/web/*/http://orteil.dashnet.org/cookieclicker/*
// @grant        none
// ==/UserScript==

javascript:(function() {
  setInterval(function(){ Game.ClickCookie(); }, 4);
}());

javascript:(function() {
  setInterval(function(){for (var i in Game.shimmers) { Game.shimmers[i].pop(); }}, 500);
}());

javascript:setInterval(function(){
  if(Game.seasonPopup.life>0)Game.seasonPopup.click()
},100);void''

javascript:setInterval(function(){
  if(Game.goldenCookie.life>0)Game.goldenCookie.click()
},100);void''