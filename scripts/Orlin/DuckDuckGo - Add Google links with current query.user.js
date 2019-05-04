// ==UserScript==
// @name DuckDuckGo - Add Google links with current query
// @namespace Violentmonkey Scripts
// @description:en Adds Google links with current query used at DuckDuckGo (for faster and more comfortable way to check alternative search results)
// @match https://duckduckgo.com/?*
// @grant none
// @run-at      document-end
// @version 0.95
// @description Adds Google links with current query used at DuckDuckGo (for faster and more comfortable way to check alternative search results)
// ==/UserScript==

setTimeout(function(){
var query = '' + document.forms.x.q.value;
var ds = document.getElementById('duckbar_static');
var link = document.createElement('a');

link.innerHTML = 'Google';
link.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
link.style.verticalAlign = 'top';
link.style.fontWeight = "bold";
//wdt.parentNode.parentNode.insertBefore(link, wdt.parentNode);
var link2 = link.cloneNode();
link2.innerHTML = 'Google';
link2.style.position = 'fixed';
link2.style.right = "110px";
link2.style.bottom = "20px";
link2.style.zIndex = "11";
link2.style.fontSize = "xx-large";

ds.parentNode.appendChild(link);
document.body.appendChild(link2);

function googleKey(e)
{
  e = e || window.event;
  if(e.keyCode == '220' && !e.shiftKey)
  {
    document.location.href = link.href;
  }
}

document.onkeydown = googleKey;
}, 1000);
