// ==UserScript==
// @name           Widescreen Forum *OLD*
// @namespace      http://www.kongregate.com/
// @description    Adjusts the width of the forums
// @include        http://www.kongregate.com/forums*
// @version 0.0.1.20160401063214
// ==/UserScript==

var h = document.getElementsByTagName("head")[0],
w = screen.width-100;



h.innerHTML+="\n<style>body#forums #forum_posts, #feature, table.forums, table.topics { width: "+w+"px; }</style>";

h.innerHTML+="\n<style>body#forums table.posts tr.hentry .entry-content { width: "+(w-164)+"px; }</style>";