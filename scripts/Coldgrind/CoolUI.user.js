// ==UserScript==
// @name CoolUI
// @description Some Cool UI stuff
// @version 0.001
// @namespace https://greasyfork.org/users/55345
// ==/UserScript==

var d = document, div = d.createElement("div");
div.style.position = "fixed";
div.style.zIndex = "2147000000";
div.style.transitionDuration = "0.3s";
div.style.backgroundColor = "lightgray";
div.style.width = "10px";
div.style.height = "10px";
div.style.transformOrigin = "50% 50%";
div.style.borderRadius = "99999px";
div.style.pointerEvents = "none";
d.body.appendChild(div);

d.body.addEventListener("click", function(e) {
	var x = e.clientX - 5, y = e.clientY - 5;
	div.style.transitionDuration = "0s";
	div.style.transform = "scale(1, 1)";
	div.style.left = x + "px";
	div.style.top = y + "px";
	div.style.width = "10px";
	div.style.height = "10px";
	div.style.opacity = "0.8";
	
	setTimeout(function() {
		div.style.transitionDuration = "0.3s";
		div.style.transform = "scale(20, 20)";
		div.style.opacity = "0";
	}, 10);
});
