// ==UserScript==
// @name         ApexFusion Icon Fix
// @namespace    http://chrislscott.com/
// @version      0.1
// @description  A fix for whatever Apex stupidly broke in the Web Open Font Format that requires IE11
// @author       Chris Scott <chris@chrislscott.com>
// @includes        http://apexfusion.com/*
// @grant        none
// ==/UserScript==

var cssId = 'font-awesome';
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
    link.media = 'all';
    head.appendChild(link);
}


var sheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// Add a media (and/or media query) here if you'd like!
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")

	// WebKit hack :(
	style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();

sheet.insertRule(".af { font: normal normal normal 14px/1 FontAwesome; }", 0);
sheet.insertRule(".af-outlet:before { content:\"\\f1e6\"; }", 0);
sheet.insertRule(".af-notepad:before { content:\"\\f24a\"; }", 0);
sheet.insertRule(".af-skull:before { content:\"\\f094\"; }", 0);
sheet.insertRule(".af-flask-add:before { content:\"\\f067\"; }", 0);
sheet.insertRule(".af-file-text-add:before { content:\"\\f067\"; }", 0);
sheet.insertRule(".af-id-badge:before { content:\"\\f0a3\"; }", 0); 