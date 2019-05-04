// ==UserScript==
// @author	Elevory
// @name Redacted Collage Export Utility
// @description Saves a collection of torrents as a text file
// @version	1.33
// @namespace http://greasyfork.org
// @include *://redacted.ch/collages.php*
// @include *://redacted.ch/bookmarks.php*
// ==/UserScript==

// Luminary: changed //passtheheadphones.me/collages.php to //redacted.ch/collages.php; quick modification.

var btnExport = document.createElement("a"); 
var container = document.getElementById("content").getElementsByClassName("linkbox")[0];
var data = "";

var pageSpans = document.getElementById("pageslinksdiv");

window.URL = window.URL || window.webkitURL; // support for additional browsers

btnExport.innerHTML = "[Export]";
btnExport.href="#";
btnExport.setAttribute("onclick", "saveData();");

btnExport.onclick = function()
{
var entries = document.getElementById("coverart").querySelectorAll("[class^='image_group_']");

if (document.URL.indexOf("bookmarks.php") > 0) collageName = "Bookmarks";
else collageName = document.getElementById("content").getElementsByClassName("header")[0]
.getElementsByTagName('h2')[0].innerHTML;

if (pageSpans !== null)
{
pageSpans = pageSpans.getElementsByTagName("span");

for (var i = 0; i < pageSpans.length; i++)
{
if(pageSpans[i].id.indexOf("pagelink") != -1)
{
pageSpans[i].firstChild.click();
entries = document.getElementById("coverart").querySelectorAll("[class^='image_group_']");
}
}
if (pageSpans.length > 0) document.getElementById("pagelink0").firstChild.click(); // return to first page
}

PopulateData(entries);

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
{
var a = document.createElement("a");
a.download = "Collage - " + collageName + ".txt";
var blob = new Blob([data], {"data":"application/octet-stream"});
a.href = window.URL.createObjectURL(blob);
a.click();
}
else
{
var taExport;
if (!document.getElementsByName("taExport")[0])
{
taExport = document.createElement("textarea");
taExport.name = "taExport";
taExport.rows = "5";
container.appendChild(taExport);
}
taExport.value = data;
}


};

container.appendChild(btnExport);

function PopulateData(entries)
{
for(var i = 0; i < entries.length; i++)
{
var entryText = entries[i].getElementsByTagName('img')[0];

if (entryText) entryText = entryText.alt;
else
{
entryText = entries[i].getElementsByTagName('span')[0]; // some torrents have missing images
if (!entryText) entryText = entries[i].getElementsByTagName('div')[0];
entryText = entryText.innerHTML;
}

data += entryText + "\r\n";
}

data = data.substring(0,data.length-1); // remove final linebreak
}