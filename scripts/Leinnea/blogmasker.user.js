// ==UserScript==
// @name blogmasker
// @version 1.01
// @namespace http://www.justmyimagination.com
// @description Shows visitors a black void
// @include http://user.adme.in/blog/browse/u/*
// @include http://user.adme.in/*
// @copyright � JustMyImagination 2015
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='body { display: inline;}';
headID.appendChild(cssNode);