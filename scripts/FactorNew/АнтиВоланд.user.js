// ==UserScript==
// @name          АнтиВоланд
// @namespace    АнтиВоланд1
// @version 	   1
// @description   АнтиВоланд2
// @include      http://virtonomic*.*/*/forum/*

// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
$('table.message_color2:has(a.username:contains(VolandAV))').remove();

  
  
                   }
  if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}