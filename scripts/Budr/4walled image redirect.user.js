// ==UserScript==
// @name         4walled image redirect
// @match        http://4walled.cc/show-*
// @description  redirect 4walled pages directly to the images
// @version 0.0.1.20160422203008
// @namespace https://greasyfork.org/users/40027
// ==/UserScript==

(function() {
    'use strict';

    document.location = document.getElementById("mainImage").firstElementChild.getAttribute("href");
})();