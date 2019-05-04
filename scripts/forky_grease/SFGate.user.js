// ==UserScript==
// @name        SFGate
// @namespace   www.sfgate.com
// @description Get rid of annoying flying Flash video thing.
// @include     http://www.sfgate.com/*
// @version     1
// @grant       none
// ==/UserScript==
var divs = document.getElementsByClassName('vembaDynamicLoad');
if (divs) {
  var node = divs[0];
  node.parentNode.removeChild(node);
}
