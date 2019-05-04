// ==UserScript==
// @name             解除封印
// @namespace    http://tampermonkey.net/
// @version          0.1
// @description   try to take over the world!
// @author          You
// @match           *
// @include         *
// @exclude        *pan.baidu.com*
// @grant        none
// ==/UserScript==

(function() {

document.addEventListener("copy", function(e){e.stopPropagation()}, true);

var $ = window.jQuery,events = ['contextmenu', 'dragstart', 'mouseup', 'copy', 'beforecopy', 'selectstart', 'select', 'keydown'];

function unbind(ele) {events.forEach(function (evt) {ele['on' + evt] = null;if ($) $(ele).unbind(evt);});}

function runScript() {[window, document].forEach(unbind);events.forEach.call(document.querySelectorAll('*'), unbind);}

window.onload = runScript;

window.onhashchange = function () {setTimeout(runScript, 300);};

})();