// ==UserScript==
// @name WEBSITE MAKER
// @namespace	http://wix.com
// @version TESTING
// @description	With this Script you can be a coder and edit every Website FREE.
// @author	Blaineelliott
// @copyright	2016+ , Blaine
// @include	*://*
// @match	https://dl.dropbox.com/sh/dk38s1qw7ice7nq/*/*
// @icon	https://dl.dropbox.com/sh/dk38s1qw7ice7nq/nmfu4e3y2S/Icon48x48.png
// @icon64	https://dl.dropbox.com/sh/dk38s1qw7ice7nq/FaeEFBlv4b/Icon64x64.png
// @priority	9999
// @grant unsafeWindow
// ==/UserScript==

// ==VAR==
var jslink = "javascript";
var work = "<a class='158704' onMouseout='load()'>Remover by Scriptz is on!</a><span class='158704'>   <--- Mouseover to Stop.</span>";
var Stopped = "<span class='158704'>Remover by Scriptz is off!</span>";
// ==============

// ==START FUNCTION==
body = document.body;
if(body !== null) {
    div2 = document.createElement("div");
    div2.setAttribute('id','first');
    div2.style.position = "fixed";
    div2.style.top = "0px";
    div2.style.right = "0px";
    div2.style.zIndex = "9999";
    div2.style.backgroundColor = "red";
    div2.style.opacity = 0.90;	
    div2.style.border = "1px solid #ffffcc";
    div2.style.padding = "3px";
    div2.innerHTML = "<div id='button'><a class='158704' href='javascript:on()'>Start</a></div>";
    body.appendChild(div2);
}
unsafeWindow.on = function() {
    document.getElementById("hide").style.visibility='visible';
    document.getElementById('first').style.left = "0px";
    document.getElementsByTagName("title")[0].firstChild.data = "► Started.";
    (function() {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'http://file1.npage.de/007324/77/bilder/favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    }());
    location.href=jslink+":document.body.contentEditable='true'; document.designMode='on'; void 0";
    document.getElementById('button').innerHTML = work;
    console.clear();
    console.warn("Remover by Scriptz is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/).");
    console.info("Remover by Scriptz is on!");
};
// ==============

// ==HIDE BUTTON==
body = document.body;
if(body !== null) {
    div2 = document.createElement("div");
    div2.setAttribute('id','hide');
    div2.style.position = "fixed";
    div2.style.top = "40px";
    div2.style.right = "0px";
    div2.style.zIndex = "9999";
    div2.style.opacity = 0.90;	
    div2.style.visibility ="hidden";
    div2.innerHTML = "<div id='img'><img onMouseout='imgload()' src='http://fs2.directupload.net/images/150909/sxcclyoz.png'></div>";
    body.appendChild(div2);
}	
unsafeWindow.imgload = function() {
    document.getElementById("hide").style.visibility='hidden';
    document.getElementById("first").style.visibility='hidden';
    document.getElementById("show").style.visibility='visible';
    console.debug("Remover toolbar is hidden!");
};
// ==============

// ==SHOW BUTTON==
body = document.body;
if(body !== null) {
    div2 = document.createElement("div");
    div2.setAttribute('id','show');
    div2.style.position = "fixed";
    div2.style.top = "0px";
    div2.style.right = "0px";
    div2.style.zIndex = "9999";
    div2.style.opacity = 0.90;	
    div2.style.visibility ="hidden";
    div2.innerHTML = "<div id='img'><img onMouseout='loadone()' src='http://fs2.directupload.net/images/150909/7tae9l8k.png'></div>";
    body.appendChild(div2);
}	
unsafeWindow.loadone = function() {
    document.getElementById("show").style.visibility='hidden';
    document.getElementById("first").style.visibility='visible';
    document.getElementById("hide").style.visibility='visible';
    console.debug("Remover toolbar is visible!");
};
// ==============

// ==STOP FUNCTION==
unsafeWindow.load = function() {
    document.getElementsByTagName("title")[0].firstChild.data = "Stopped.";
    location.href=jslink+":document.body.contentEditable='false'; document.designMode='off'; void 0";
    document.getElementById('button').innerHTML = Stopped;
    window.setTimeout(function() { document.getElementById("first").style.visibility='hidden'; }, 10000);
    window.setTimeout(function() { document.getElementById("hide").style.visibility='hidden'; }, 10000);
    window.setTimeout(function() { document.getElementById("show").style.visibility='hidden'; }, 10000);
    console.info("Remover by Scriptz is off!");
};
// ==============