// ==UserScript==
// @name YouTube Converter | convert2mp3.net
// @description A download button will be added to YouTube videos that allow you to download the video in MP3-format
// @include *://www.youtube.com/*
// @include *://www.youtube.com/*
// @version 1.0
// @date 2016-09-08
// @namespace https://greasyfork.org/users/64737
// ==/UserScript==


function addbutton(){
console.log("dasd");
if (window.location.href.match(/youtube.com/i)) {
var DIV = document.createElement('span');
	//DIV.innerHTML = '';
	DIV.appendChild(document.createTextNode(''));
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-user-header");
if (divp)
	divp.appendChild(DIV);

var url = encodeURIComponent(window.location);


var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://convert2mp3.net/index.php?p=call&format=mp3&url=" + url + ""); self.focus();}, false);
}
}


if (window.location.href.match(/youtube.com/i)) {
var DIV = document.createElement('span');
	//DIV.innerHTML = '';
	DIV.appendChild(document.createTextNode(''));
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-user-header");
if (divp)
	divp.appendChild(DIV);

var url = encodeURIComponent(window.location);


var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://convert2mp3.net/index.php?p=call&format=mp3&url=" + url + ""); self.focus();}, false);

	
	var prevHash = window.location.href;
	//console.log(window.location.href);
	//console.log(prevHash);
        window.setInterval(function () {
		//console.log("setlocati:" + window.location.href);
		//console.log("sethash:" + prevHash);
           if (window.location.href != prevHash) {
              prevHash = window.location.href;
			  //console.log("hrefdiff");
				addbutton();
           }
        }, 2000);
}