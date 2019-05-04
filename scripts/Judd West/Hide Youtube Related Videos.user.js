// ==UserScript==
// @author Judd West
// @name        Hide Youtube Related Videos
// @namespace   hide-youtube-related-videos
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// @description     Hide the related videos sidebar on Youtube videos
// @license MIT
// @require  https://code.jquery.com/jquery-3.3.1.slim.min.js
// @version     1.1
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    function hideRecommended(){
        if(jQuery('#playlist').is(":hidden")) {
            jQuery('#secondary').hide();
        } else {
            jQuery('#related').hide();
        }
    }
    window.setTimeout(hideRecommended, 1000)
})();