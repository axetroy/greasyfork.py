// ==UserScript==
// @name         Instagram Tweaks
// @namespace    https://tesomayn.com
// @version      4.0.0
// @description  Middle-click any image (posted or default picture) to open full size; Click video thumbnail then middle-click ANYWHERE to view .mp4
// @author       TesoMayn
// @match        *://*.instagram.com/*
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==
$(document).ready( function() {
    $(window).on('load scroll', function() {
        $("body > span > section > main > article > header > div > img").on('mousedown', function(d) {
            if( (d.which == 2) ) {
                var dp = $(this).attr('src').replace(/[p|s][0-9]\w+/g, '');
                window.open(dp, '_blank');
            }
            d.preventDefault();
        });

        $("body > span > section > main > article > div > div > div > a").on('mousedown', function(e) {
            if( (e.which == 2) ) {
                var full = $(this).find('img').attr('src').replace(/e35\/.*\//, '').replace(/[p|s][0-9]\w+/g, '');
                window.open(full, '_blank');
            }
            e.preventDefault();
        });

        if ($('video').length) {
            $("body").on('mousedown', function(e) {
                if( (e.which == 2) ) {
                    var src = $('video', this).attr('src');
                    window.open(src, '_blank');
                    console.log(src);
                }
                e.preventDefault();
            });
        }
    });
    console.log('Instagram Full-Size v'+GM_info.script.version+' Initialized');
});
