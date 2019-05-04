// ==UserScript==
// @author			Rainbow-Spike
// @version			1.3
// @name			Coub Chat PM
// @description		Ссылки на PM собеседников
// @icon			https://www.google.com/s2/favicons?domain=coub.com
// @include			http*://*coub.com/chat/*
// @grant			none
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var timer = 3000;

function coub_pm(){
 var links = document.querySelectorAll("a");
 for (var i in links) {
  var newlink = document.createElement('a');
  if (links[i].href) {
   newlink.href = links[i].href.replace(/.com\//, '.com/chat/@');
   newlink.innerHTML = 'PM';
   newlink.target = '_blank';
   links[i].parentNode.appendChild(newlink);
  };
 };
};

setTimeout(coub_pm,timer);
