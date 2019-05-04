// ==UserScript==
// @name         amazon-links-new-tab                                                                                   
// @namespace    http://www.ziffusion.com/
// @description  Amazon links in new tab
// @author       Ziffusion
// @match        https://www.amazon.com/*
// @grant        none
// @version      3.0
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var ii = 0; ii < links.length; ++ii) {
  if (!links[ii].target && /&qid=[0-9]+&/.test(links[ii].href)) links[ii].target = "_blank";
}
