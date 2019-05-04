// ==UserScript==
// @name        CodeMirror Set Theme
// @namespace   http://hermanfassett.me
// @description Change CodeMirror theme to default
// @include     http://www.freecodecamp.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

var cm = document.getElementsByClassName("CodeMirror");
for (var i = 0; i < cm.length; i++) {
  cm[i].className = cm[i].className.replace(/\bcm-s-[^\s]+\b/,'cm-s-default');
}