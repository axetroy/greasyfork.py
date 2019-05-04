// ==UserScript==
// @name		opensubtitles.org better downloads
// @author		doctord
// @description	download manager no more! Direct download of subtitles
// @include		http://www.opensubtitles.org/*/subtitles/*
// @version		0.3
// @namespace https://greasyfork.org/users/3271
// ==/UserScript==
 
var url;
var sub;
var go;
var id;

function dowSub()
{
    url="http://dl.opensubtitles.org/it/download/sub/";
    sub=document.URL;
    id=sub.substring(42, 49);
    go=url.concat(id);
    window.open(go);
}

var newButton = document.createElement('input');
newButton.type="button";
newButton.value="Direct Download!";
newButton.onclick = dowSub;
var checkBox = document.getElementById('cbDownloader');
checkBox.parentNode.insertBefore(newButton, checkBox);