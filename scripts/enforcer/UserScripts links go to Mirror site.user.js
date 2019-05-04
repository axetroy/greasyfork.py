// ==UserScript==
// @name        UserScripts links go to Mirror site
// @namespace   enforcer
// @include 	*
// @version     1
// @grant       none
// @description changes dead userscripts.org link to userscripts-mirror.org
// ==/UserScript==

links = document.querySelectorAll("a");

for(i = 0; i < links.length; i++) {
	li = links[i];
	if(li.href.match(/https*:\/\/[www\.]*userscripts\.org/) != null) {
		//change link
		li.href = li.href.replace("userscripts.org", "userscripts-mirror.org");
		if(li.innerHTML.match(/https*:\/\/[www\.]*userscripts\.org/) != null) {
			//change link text
			li.innerHTML = li.innerHTML.replace("userscripts.org", "userscripts-mirror.org");
			}
		}
	}
	