// ==UserScript==
// @name        MetricsGraphicsJS Code Font Replacer
// @namespace   https://www.metricsgraphicsjs.org/
// @description Replaces the code font blocks so that it's better on the screen
// @include     https://www.metricsgraphicsjs.org/*
// @version     2
// @grant       none
// ==/UserScript==
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) return;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss (
	'pre, code, text-area { font-family: Menlo,Monaco,Consolas,"Courier New",monospace ! important; }'
);