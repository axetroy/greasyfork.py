// ==UserScript==
// @name         Show/Hide issue comments for GitHub Issues
// @namespace    http://kyanny.me/
// @version      1.0.0
// @description  Add floating button to show/hide issue comments of GitHub Issues, to see discussion events / references easier.
// @author       Kensuke Nagae
// @match        https://github.com/*/*/issues/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var button = document.createElement('button');
  button.setAttribute('style', 'position: fixed; top: 10px; right: 5px;');
  button.setAttribute('data-display', "block");
  var text = document.createTextNode('Show/Hide comments');
  button.appendChild(text);

  button.onclick = function() {
    var display = button.getAttribute('data-display');

    var comments = Array.prototype.slice.call(document.querySelectorAll('.js-comment-container'));

    if (display === "hidden") {
      // Show
      Array.forEach(comments, function(comment) {
        comment.style = 'display: block';
      });
      button.setAttribute('data-display', "block");
    } else {
      // Hide
      Array.forEach(comments, function(comment) {
        comment.style = 'display: none';
      });
      button.setAttribute('data-display', "hidden");
    }
  };

  document.body.appendChild(button);
})();