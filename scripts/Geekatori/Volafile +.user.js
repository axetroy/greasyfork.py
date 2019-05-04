// ==UserScript==
// @name        Volafile +
// @description Add function to Volafile and cleanup interface
// @namespace   Volafileplus
// @include     *://volafile.org/*
// @version     3
// @grant       none
// ==/UserScript==
// http://www.geekatori.com
(function () {
  'use strict';
  document.body.style.fontSize = '14px';
  
  var imageOverlay = document.getElementById('gallery_image_overlay');
  var highlight = document.querySelector('.chat_message.highlight');

  imageOverlay.parentNode.removeChild(imageOverlay);
  highlight.parentNode.removeChild(highlight);
}) ();