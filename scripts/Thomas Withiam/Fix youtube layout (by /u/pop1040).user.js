// ==UserScript==
// @name     Fix youtube layout (by /u/pop1040)
// @description:en fixes the youtube layout
// @version  1
// @grant    none
// @author /u/pop1040
// @include      https://www.youtube.com
// @include      https://www.youtube.com/*
// @run-at       document-start
// @noframes
// @namespace https://greasyfork.org/users/205384
// @description fixes the youtube layout
// ==/UserScript==

(function(){

  //for correcting on navigation to a new video
  window.addEventListener("spfdone", function(e){
    if(!document.getElementById("content").classList.contains('content-alignment')){
        document.getElementById('content').classList.add('content-alignment');
    }
  });

  //for when you load a video directly
  window.addEventListener("load", function(event) {
    if(!document.getElementById("content").classList.contains('content-alignment')){
      document.getElementById('content').classList.add('content-alignment');
    }
  });

})();