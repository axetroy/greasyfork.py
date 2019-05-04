// ==UserScript==
// @name         Hide Imgur Images
// @namespace    https://greasyfork.org/en/users/96096-purple-pinapples
// @version      0.2
// @description  Hides all the images on the homepage of imgur
// @author       PurplePinapples
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match        https://imgur.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("#imagelist").hide()
    $("#tags-current-list").hide()
})();