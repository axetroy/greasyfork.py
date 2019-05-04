// ==UserScript==
// @name         Hide Facebook Ads
// @namespace    Facebook
// @icon https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico
// @version      0.1.4
// @description  Makes sponsored feeds invisible on facebook.com
// @author       Harry Nguyen
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

function upTo(el, tagName) {
    tagName = tagName.toLowerCase();

    while (el && el.parentNode) {
        el = el.parentNode;
        if (el.id && el.id.toLowerCase().indexOf(tagName) !== -1) {
          return el;
        }
      }

      return null;
 }

function trimAds () {
    posts = document.getElementsByClassName("_5_xt");
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        if (post.innerHTML.indexOf("Similar to Posts You've Interacted With") !== -1) {
           var parent = upTo(post, 'hyperfeed_story_id');
           if (parent) parent.style.display = "none";
        }
    }
}

(function() {
    window.addEventListener('scroll', function () {
        setTimeout(trimAds, 1000);
    });
})();