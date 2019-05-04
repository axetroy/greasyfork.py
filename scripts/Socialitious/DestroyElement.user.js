//
// ==UserScript==
// @name DestroyElement
// @version 1.0
// @description Hold alt + ctrl and click on elements to destroy them
// @namespace https://greasyfork.org/users/28433
// ==/UserScript==
//

var all = document.getElementsByTagName("*");
var pressed = false;
var enabled = false;

for (var i = 0;i < all.length;i++) {
	all[i].addEventListener("mousedown", destroyElement);
	all[i].addEventListener("mouseup", function() { pressed = false; });
	all[i].addEventListener("mouseover", displayHover);
	all[i].addEventListener("mouseout", displayOut);
}

function destroyElement(el) {
	if (!pressed) {
		if (enabled) {
			el.target.parentNode.removeChild(el.target);
			pressed = true;
		}
	}
}

document.getElementsByTagName("body")[0].addEventListener("keydown", enable);
document.getElementsByTagName("body")[0].addEventListener("keyup", disable);


// Hold ctrl + alt to enable
function enable(e) {
	if (e.altKey && e.ctrlKey) {
		enabled = true;
	}
}

// Release ctrl + alt to disable
function disable(e) {
	enabled = false;
	for (var i = 0;i < all.length;i++) {
		all[i].style.boxShadow = "initial";
	}
}

function displayHover(el) {
	if (enabled) {
		el.target.style.boxShadow = "inset 0px 0px 3px blue";
	}
}

function displayOut(el) {
	if (enabled) {
		el.target.style.boxShadow = "initial";
	}
}
