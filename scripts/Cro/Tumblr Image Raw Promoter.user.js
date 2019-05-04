// ==UserScript==
// @name         Tumblr Image Raw Promoter
// @version      0.5
// @description  Automatically promotes Tumblr image links to raw.
// @author       Cro
// @match        https://68.media.tumblr.com/*
// @match        http://68.media.tumblr.com/*
// @grant        none
// @namespace https://greasyfork.org/users/10865
// ==/UserScript==
(function () {
    'use strict';

    // Check if this page contains a single image whose source is also the location.
    var image = document.getElementsByTagName('img')[0];
    var loc = location.toString();

    if (image && image.src == loc)
    {
        window.location = image.src.replace(/_\d+./, '_raw.').replace(/\/\/.*\.media\.tumblr\.com/, '//media.tumblr.com');
    }
}());
