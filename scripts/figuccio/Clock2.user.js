// ==UserScript==
// @name	Clock2
// @description Show time right.
// @author      figuccio
// @version     0.1
// @namespace https://greasyfork.org/users/237458
// @include     *
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

if( top.location != location ) return;

Number.prototype.pad = function(size)	{
	if( typeof(size) !== "number" )   {
		size = 2;
	}
	var	s = String(this);
	while (s.length < size)   {
		s = "0" + s;
	}
	return s;
}

var tod = document.createElement("div");
tod.id = "todClock";

tod.setAttribute(
	"style",

	"bottom:50px;"			+
	"color:black;"		+
	"font-family:droid sans mono;"	+
	"font-size:16pt;"		+
	"line-height:20px;"		+
	"position:fixed;"		+
	"right:4px;"			+
	"text-align:center;"		+
	"z-index:9999;"			+
   " background-color:White;"+
	"-moz-user-select:none;"

);

var clicker = document.createAttribute( "onClick" );
clicker.nodeValue = "document.getElementById('todClock').style.display = 'none';";
tod.setAttributeNode(clicker)

function tick() {
	var	d = new Date();
	var Y = d.getFullYear();
	var M = (d.getMonth()+1).pad();
	var D = d.getDate().pad();
	var h = d.getHours().pad();
	var m = d.getMinutes().pad();
	var s = d.getSeconds().pad();
	tod.innerHTML =D + "-" + M + "-" + Y + " " + h + ":" + m + ":" + s;
}

tick();
setInterval(tick, 500);

$('html body').append(tod);

