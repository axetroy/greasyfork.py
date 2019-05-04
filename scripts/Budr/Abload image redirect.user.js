// ==UserScript==
// @name         Abload image redirect
// @description  redirect Abload pages directly to the images
// @match        http://abload.de/image.php?img=*
// @version 0.0.1.20180302223851
// @namespace https://greasyfork.org/users/40027
// ==/UserScript==

(function() {
    'use strict';

    document.location = document.getElementById("image").getAttribute("src");
})();