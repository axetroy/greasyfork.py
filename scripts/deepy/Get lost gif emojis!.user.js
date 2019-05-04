// ==UserScript==
// @name         Get lost gif emojis!
// @namespace    https://xd.cm/
// @version      0.0.2
// @description  Remove gif emojis from slack
// @author       Alex Nordlund
// @match        https://*.slack.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(function($) {
  // On page load
  $("#msgs_div").find(".emoji").filter(
    function() { return $(this).css('background-image').endsWith('.gif")')}
  ).css('display', 'none');

  // When new post is added
  $("#msgs_div").on('DOMSubtreeModified propertychange', function() {
    $("#msgs_div").find(".emoji").filter(
      function() { return $(this).css('background-image').endsWith('.gif")')}
    ).css('display', 'none');
  });

});