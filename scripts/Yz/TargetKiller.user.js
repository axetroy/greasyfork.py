// ==UserScript==
// @name           TargetKiller
// @namespace      http://userscripts.org/users/splurov/
// @include        *
// @version 0.0.1.20140904105115
// @description remove '_blank' from links target
// ==/UserScript==

(function(){

for (
	var links = document.links,
			linksLength = links.length,
			i = 0;
	i < linksLength;
	i++
) {
	if (links[i].target == '_blank') {
		links[i].removeAttribute('target');
	}
}

})();