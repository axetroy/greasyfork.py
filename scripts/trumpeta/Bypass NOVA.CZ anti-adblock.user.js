// ==UserScript==
// @name        Bypass NOVA.CZ anti-adblock
// @name:cs     Neutralizuj NOVA.CZ anti-adblock
// @description Defend anti-adblock on nova.cz
// @description:cs Defend anti-adblock on nova.cz
// @include     http://*.nova.cz/*
// @include     https://*.nova.cz/*
// @version     1.00
// @author      Já, Osobně
// @run-at      document-start
// @namespace https://greasyfork.org/users/198317
// ==/UserScript==

document.onbeforescriptexecute = (e) => {
  if (e.target.src.indexOf('player.min.js') < 0) { return; }
  e.preventDefault();
  e.stopPropagation();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) { // Typical action to be performed when the document is ready:
	  var newScript = document.createElement('script');
	  newScript.type = "text/javascript";
	  newScript.textContent = xhttp.responseText.replace(
		/\bif\s*\(\s*_this\d+\._options\.ads\s*&&\s*_this\d+\._options\.adblock\s*\)/,
		'if(false)').replace(
		/;\s*registerPlugin\(.*?,\s*contribAdsPlugin\s*\)/,
		''
	  );
	  document.getElementsByTagName('head')[0].appendChild(newScript);
	}
  };
  xhttp.open("GET", e.target.src, true);
  xhttp.send();
};
