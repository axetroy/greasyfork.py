// ==UserScript==
// @name         Get lost giphy!
// @namespace    http://ergonlogic.com/
// @version      0.0.2
// @description  Remove giphy from slack
// @author       Christopher Gervais
// @match        https://*.slack.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(function($) {
  // On page load
  $("*[data-real-src*='giphy']").css('display', 'none');

  // When new post is added
  $("#msgs_div").on('DOMSubtreeModified propertychange', function() {
    $("*[data-real-src*='giphy']").css('display', 'none');
  })

})