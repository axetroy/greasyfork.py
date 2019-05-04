// ==UserScript==
// @name          remove tgfc flag for abp
// @description   press shift+r to remove the flag
// @namespace https://greasyfork.org/users/115835
// @require https://code.jquery.com/jquery-3.2.1.slim.min.js
// @match        *://*.tgfcer.com/*
// @version 0.0.1.20170412073707
// ==/UserScript==

(function(){
document.addEventListener('keydown', function(e) {
 if (e.keyCode == 82 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
  $("i").remove();
 }
}, false);
})();
