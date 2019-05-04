// ==UserScript==
// @name        YouTube Hide related FNAFHS videos
// @version     1.2
// @description Hides FNAFHS videos from YouTube homepage, channel page, search page and 'related videos' sidebar
// @author      ElNobDeTfm
// @include     http://youtube.com/*
// @include     http://www.youtube.com/*
// @include     https://youtube.com/*
// @include     https://www.youtube.com/*
// @grant       none
// @require     http://code.jquery.com/jquery-latest.min.js
// @namespace https://greasyfork.org/users/89911
// ==/UserScript==
jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
function hideFNAFHS_search() {
    $(".yt-lockup.yt-lockup-tile.yt-lockup-video.clearfix, .yt-lockup.yt-lockup-tile.yt-lockup-playlist.clearfix").each( function () {
        if ($("h3:Contains('FNAFHS')", this).length > 0) {
            $(this).remove();
        }
    });
    $(document).one('DOMNodeInserted', '.yt-lockup', hideFNAFHS_search);
}
hideFNAFHS_search();
function hideFNAFHS_page() {
    $(".yt-lockup-dismissable, .video-player-view-component.branded-page-box").each( function () {
        if ($("h3:Contains('FNAFHS')", this).length > 0) {
            $(this).remove();
        }
    });
    $(document).one('DOMNodeInserted', '.yt-lockup-dismissable', hideFNAFHS_page);
}
hideFNAFHS_page();
function hideFNAFHS_related() {
    $("#watch-related li, .autoplay-bar").each( function () {
        if ($("span:Contains('FNAFHS')", this).length > 0) {
            $(this).remove();
        }
    });
    $(document).one('DOMNodeInserted', '#watch-related', hideFNAFHS_related);
}
hideFNAFHS_related();