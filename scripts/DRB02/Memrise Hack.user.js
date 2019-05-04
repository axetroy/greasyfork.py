// ==UserScript==
// @name         Memrise Hack
// @namespace    https://greasyfork.org/en/users/23079-drb02
// @version      0.1
// @description  Disables the Timer on Memrise.com
// @author       DRB02
// @match        http://www.memrise.com/*
// @grant        none
// ==/UserScript==

var onLoad = function($) {
  $("div.garden-timer div.txt").bind("DOMSubtreeModified", function() {
    MEMRISE.garden.timer.cancel();
  });
};

var injectWithJQ = function(f) {
    var script = document.createElement('script');
    script.textContent = '$(' + f.toString() + '($));';
    document.body.appendChild(script);
};
injectWithJQ(onLoad);