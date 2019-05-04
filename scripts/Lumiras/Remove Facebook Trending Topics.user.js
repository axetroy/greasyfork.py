// ==UserScript==
// @name         Remove Facebook Trending Topics
// @namespace    http://polybius.design
// @version      0.1
// @description  Hide the "Trending Topics" section of Facebook, reduce stress in your life.
// @author       Lumiras
// @match        https://www.facebook.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "#pagelet_trending_tags_and_topics { display: none}";
    document.body.appendChild(css);
})();