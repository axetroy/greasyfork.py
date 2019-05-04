// ==UserScript==
// @name         Taze's extention
// @namespace    Gota.io extention
// @description  Use shift to stand still + if there is something you don't like, just change the script or tell me ;) Working on a new version ;)
// @version      1
// @author       Backwood
// @match        http://gota.io/web/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();// xd
function addStyleSheet(style){
	var getHead = document.getElementsByTagName("HEAD")[0];
	var cssNode = window.document.createElement( 'style' );
	var elementStyle= getHead.appendChild(cssNode);
	elementStyle.innerHTML = style;
	return elementStyle;
}

//Custom Font, Logo, Minimap
addStyleSheet('@import url(https://fonts.googleapis.com/css?family=Ubuntu);');
GM_addStyle('*{font-family: Ubuntu;}');
GM_addStyle('* #leaderboard-panel {font-size: 24px;}');

var fillTextz = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function(){
	var argumentz = arguments;
	if(this.canvas.id == 'leaderboard-canvas'){
		this.font = 'bold 15px Ubuntu';
	}
	if(this.canvas.id == 'minimap-canvas'){
		this.font = 'bold 15px Ubuntu';
	}
	if(this.canvas.id == 'party-canvas'){
		this.font = 'bold 15px Ubuntu';
	}
	fillTextz.apply(this, arguments);
};

//Border Removal
document.getElementById("leaderboard-panel").style.borderRadius = "0";
document.getElementById("leaderboard-panel").style.borderWidth = "0px";
document.getElementById("leaderboard-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("score-panel").style.borderRadius = "0";
document.getElementById("score-panel").style.borderWidth = "0px";
document.getElementById("score-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("minimap-panel").style.borderRadius = "0";
document.getElementById("minimap-panel").style.borderWidth = "0px";
document.getElementById("minimap-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("minimap-panel").style.marginBottom = "3px";
document.getElementById("party-panel").style.borderRadius = "0";
document.getElementById("party-panel").style.borderWidth = "0px";
document.getElementById("party-panel").style.boxShadow = "0px 0px 0px black";



//Chat Size
GM_addStyle('* #chat-panel {width: 300px}');
GM_addStyle('* #chat-panel {height: 195px}');

//Social Media Buttons Removal
$(".main-bottom-links").replaceWith("");

//Instructions
var maincontent = document.getElementById("main-content");
var version = document.createElement("div");
version.innerHTML = 'T - Tricksplit -|- A - Triplesplit -|- Q - Double split';
version.id = 'instructions';
maincontent.appendChild(version);
document.getElementById("instructions").style.textAlign = "center";
document.getElementById("instructions").style.fontSize = "12px";
document.getElementById("instructions").style.color = "white";

//Ad Remove
$("#main-rb").replaceWith("");
GM_addStyle ('* #main {left: 350px;}');

//Custom Cursor
GM_addStyle ('* body {cursor: crosshair;}');

function split() {
	window.onkeydown({keyCode: 32});
	window.onkeyup({keyCode: 32});
}

window.addEventListener('keydown', keydown);
//window.addEventListener('keyup', keyup); //This isn't used
var timeBetweenSplits = 10; //This is the number of milliseconds between splits for the macros

    if (event.keyCode == 82) { //key R
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
	} else if (event.keyCode == 65) { //key A
		split();                  //Triple Split
		setTimeout(split, timeBetweenSplits*1);
		setTimeout(split, timeBetweenSplits*2);
	} else if (event.keyCode == 16) { //key SHIFT
		$("canvas").trigger($.Event("mousemove", {clientX: window.innerWidth/2, clientY: window.innerHeight/2})); //Stop Cell

	} else if (event.keyCode == 70) { //key F
		document.getElementById("cHideFood").click(); //Hide Pellets (Delete this line if you don't want it)
	} else if (event.keyCode == 83) { //key S
		document.getElementById("cHideSkins").click(); //Hide Skins (Delete this line if you don't want it)
	}
//Remove some of the code sections if you dislike them