// ==UserScript==
// @name extencion ♥ƊƬƊ♥
// @namespace http://tampermonkey.net/
// @version 1.1
// @description Do the best tricks and split faster !!!
// @author ?i✖✖✖❥统⇀⛔ƊƬƊ♥?
// @match http://happyfor.win/*
// @match http://happyfor.win/*
// @match http://happyfor.win/*
// @match http://happyfor.win/*
// @match http://happyfor.win/*
// @match http://happyfor.win/*
// @match http://happyfor.win/*
// @grant none
// @run-at document-end
// ==/UserScript==
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var Feed = false;
var Dingus = false;
var imlost = 25;
document.getElementById("instructions").innerHTML += "༺⋘Created by ♥ƊƬƊ♥ | DTD CLAN OFICIAL»༻";
document.getElementById("instructions").innerHTML += "Like Extension";
document.getElementById("instructions").innerHTML += "Update 1.0";
document.getElementById("instructions").innerHTML += "";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_e'> <b></b> </span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_q'> Created by<b> <strong>?i✖✖✖❥统⇀⛔ƊƬƊ♥?</strong> and <strong>ƊƬƊ♥ CLAN</strong></b>!</span></span></center>";
document.getElementById("instructions").innerHTML += "<a href='https://www.youtube.com/channel/UCkBwz2jBkzYhZPkCTcWVJQA' target='_blank'><img alt='Agar.io & Other !' id='Header1_headerimg' src='http://www.dutchnewsdesign.com/wp-content/uploads/2014/01/DND-logo-black.png'display: inline' height='100px ; ' width='100px; '></div>";
document.getElementById("instructions").innerHTML += "<a href='https://www.facebook.com/amar.delic.014' target='_blank'><img alt='Like my FaceBook page !' id='Header1_headerimg' src='https://yt3.ggpht.com/-3d3eysTr7oY/AAAAAAAAAAI/AAAAAAAAAAA/U6cGdxxSLpY/s900-c-k-no-mo-rj-c0xffffff/photo.jpg' style='display: inline' height='100px ; ' width='100px; '></div>";
load();load();
function load() {
if (document.getElementById("overlays").style.display!="none") {
document.getElementById("settings").style.display = "block";
if (document.getElementById('showMass').checked) {document.getElementById('showMass').click();}
document.getElementById('showMass').click();
if (document.getElementById('darkTheme').checked) {document.getElementById('darkTheme').click();}
document.getElementById('darkTheme').click();
// I changed the above because now agario 'remembers' your preferences, but doesn't actually work, so if they're already set to be true, you need to undo it, then re click to true
} else {
setTimeout(load, 100);
}
}
function keydown(event) {
if (event.keyCode == 81) {
Feed = true;
setTimeout(fukherriteindapussie, imlost);
} // Tricksplit
if (event.keyCode == 65 || event.keyCode == 65) { //( ͡° ͜ʖ ͡°)
ilikedick();
setTimeout(ilikedick, imlost);
setTimeout(ilikedick, imlost*2);
setTimeout(ilikedick, imlost*3);
} // Triplesplit
if (event.keyCode == 65 || event.keyCode == 65) {
ilikedick();
setTimeout(ilikedick, imlost);
setTimeout(ilikedick, imlost*2);
} // Doublesplit
if (event.keyCode == 68 || event.keyCode == 68) {
ilikedick();
setTimeout(ilikedick, imlost);
} // Split
if (event.keyCode == 65) {
ilikedick();
}
} // When Player Lets Go Of Q, It Stops Feeding
function keyup(event) {
if (event.keyCode == 81) {
Feed = false;
}
if (event.keyCode == 79) {
Dingus = false;
}
}
// Feed Macro With Q
function fukherriteindapussie() {
if (Feed) {
window.onkeydown({keyCode: 69});
window.onkeyup({keyCode: 69});
setTimeout(fukherriteindapussie, imlost);
}
}
function ilikedick() {
$("body").trigger($.Event("keydown", { keyCode: 32}));
$("body").trigger($.Event("keyup", { keyCode: 32}));
}﻿