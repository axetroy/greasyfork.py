// ==UserScript==
// @name         vk.com ad blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removing advertisements on the social network vk.com
// @author       Vite
// @match        *://vk.com/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    function wallAds()
    {
        var w1 = $('.wall_text_name_explain_promoted_post.post_link');
        if (w1.length)
        {
            w1.parents()[5].remove();
        }
        var w2 = $('.wall_marked_as_ads');
        if (w2.length)
        {
            w2.parents()[4].remove();
        }
    }
    function removeAds()
    {
        var ads_left = $('#ads_left');
        if (ads_left.length)
        {
            ads_left.remove();
        }
        wallAds();
    }
    document.addEventListener("DOMContentLoaded", removeAds);
    document.addEventListener("DOMSubtreeModified", removeAds);
})();