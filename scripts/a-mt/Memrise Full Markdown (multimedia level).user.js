// ==UserScript==
// @name           Memrise Full Markdown (multimedia level)
// @description    Enables full Markdown support for multimedia levels on Memrise.com
// @match          http://*.memrise.com/*
// @match          https://*.memrise.com/*
// @run-at         document-end
// @version        1.1
// @grant          none
// @namespace      https://greasyfork.org/users/213706
// ==/UserScript==

if(typeof unsafeWindow == "undefined") {
  unsafeWindow = window;
}

if(typeof unsafeWindow.level_multimedia != "undefined") {

  // Disable Memrise's native markdown 
  var data = unsafeWindow.level_multimedia;
  unsafeWindow.level_multimedia = "";

  // When renderer is loaded, enable all HTML tags and render Markdown
  window.addEventListener('load', function() {
    unsafeWindow.MEMRISE.renderer.allowed_tags = "*";

    var e = unsafeWindow.MEMRISE.renderer.rich_format(data);
    unsafeWindow.$(".multimedia-wrapper").html(e);
    unsafeWindow.MEMRISE.renderer.do_embeds(unsafeWindow.$(".multimedia-wrapper"));
  }, false);
}