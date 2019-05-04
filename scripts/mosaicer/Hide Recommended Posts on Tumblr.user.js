// ==UserScript==
// @name        Hide Recommended Posts on Tumblr
// @namespace   https://github.com/mosaicer
// @author      mosaicer
// @description Hide recommended posts on dashboard of Tumblr
// @include     https://www.tumblr.com/dashboard
// @version     1.0
// @run-at      document-idle
// @grant       none
// ==/UserScript==
(function () {
  'use strict';

  var postsField = document.getElementById('posts'),
      hideRecommendedPosts = function (nodesList) {
        [].forEach.call(nodesList, function (targetNode) {
          if (targetNode.children[0].classList.contains('is_recommended')) {
            targetNode.style.display = 'none';
          }
        });
      };

  hideRecommendedPosts(postsField.children);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      hideRecommendedPosts(mutation.addedNodes);
    });
  }).observe(postsField, {childList: true});
}());