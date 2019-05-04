// ==UserScript==
// @name         NoMouseWheelZoom
// @namespace    NoNameSpace
// @version      1.0
// @description  No Mouse Wheel Zoom
// @author       You
// @include      *
// @match        *
// ==/UserScript==

function mousewheelfn(a){if(a.ctrlKey){a.preventDefault();a.stopPropagation()}}window.onmousewheel=document.onmousewheel=mousewheelfn;