// ==UserScript==
// @name     goodgame.ru new clips
// @description:en change default clip tab to new instead of recommended
// @version  1.1
// @include  https://goodgame.ru/*
// @grant    none
// @run-at   document-idle
// @grant    unsafeWindowv
// @namespace https://greasyfork.org/users/72530
// @description change default clip tab to new instead of recommended
// ==/UserScript==

var url = window.location.href;
if (checkUrl(url)) { doSomething(); };

setInterval(function () {
  if (window.location.href != url)
  {
    url = window.location.href;
    if (checkUrl(url)) { doSomething(); };
  }
}, 1000);

function checkUrl(currentUrl) {
  return currentUrl.endsWith("goodgame.ru/clips/");
}

function doSomething() {
  var tabs = document.getElementsByClassName('clip-tab')[0];
  var tabLinks = tabs.getElementsByTagName('a');
  for (var i=0; i < tabLinks.length; i++) 
  {
    var link = tabLinks[i];
    if (link.href.endsWith("/clips/")) 
    {
      link.style.display = 'none';
    }
    
    if (link.href.endsWith("/clips/new/")) 
    {
      link.click();
      break;
    }
  }
}