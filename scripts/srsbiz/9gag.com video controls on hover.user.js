// ==UserScript==
// @name           9gag.com video controls on hover
// @namespace      pl.srsbiz
// @description    Show video controls on mouse hover
// @include        https://9gag.com/*
// @grant          none
// @version 0.0.1.20180611200256
// ==/UserScript==

jQuery(document).ready(function($){    
  var attachVideoControls = function(){
    var containers = $('#list-view-2,#individual-post,.listview,.post-page');
    if (containers.length) {
      containers.on('mouseenter', 'video', function(evt){
        $(this).prop('controls', true);
      }).on('mouseleave', 'video', function(evt){
        $(this).prop('controls', false);
      });
    } else {
      window.setTimeout(attachVideoControls, 250);
    }
  };
  window.setTimeout(attachVideoControls, 250);
});
