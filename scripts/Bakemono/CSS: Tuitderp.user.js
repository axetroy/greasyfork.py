// ==UserScript==
// @name          CSS: Tuitderp
// @namespace     MonstroChan.org
// @description    Cambiar la CSS porque no sirve la chingadera
// @include        *monstrochan.org/l*
// @version 0.0.1.20150116054999
// ==/UserScript==




var cssUrl = "http://monstrochan.org/l/css/twitah.css";

var head = document.getElementsByTagName("head")[0];

var link = document.createElement("link");

link.rel = "stylesheet";
link.type = "text/css";
link.href = cssUrl;

document.head.appendChild(link);