// ==UserScript==
// @name CTRL+DRAW
// @description Draw guide lines or such by holding ctrl down
// @author Socialitious
// @version 0.0.1.20160818214142
// @namespace https://greasyfork.org/users/28433
// ==/UserScript==

var d = document, c = d.createElement("canvas");
c.width = "2000", c.height = "2000";
c.style.position = "absolute";
c.style.top = "0", c.style.left = "0";
c.style.zIndex = "2147000000";
c.style.pointerEvents = "none";
d.body.appendChild(c);
var g = c.getContext("2d");
var drawing = false;
var colors = ["red", "blue", "green"];
var x = 0, y = 0;
var pressed = false;

var CTRL = 17;
d.addEventListener("keydown", function(e) {
	if (e.which == CTRL && !pressed) {
		pressed = true;
		g.fillStyle = colors[Math.floor(Math.random() * colors.length)];
		drawing = true;
	}
});

d.addEventListener("keyup", function(e) {
	if (e.which == CTRL) {
		pressed = false;
		drawing = false;
		g.clearRect(0, 0, 2000, 2000);
	}
});

d.body.addEventListener("mousemove", function(e) {
	x = e.pageX;
	y = e.pageY;
});

setInterval(function() {
	if (drawing) {
		// g.fillRect(x - 5, y - 5, x + 5, y + 5);
		g.beginPath();
		g.arc(x, y, 5, 0, 2 * Math.PI, false);
		g.fill();
	}
}, 1);
