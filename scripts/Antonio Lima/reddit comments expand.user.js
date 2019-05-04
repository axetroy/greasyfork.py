// ==UserScript==
// @name         reddit comments expand
// @namespace    http://www.reddit.com/
// @version      1.5
// @description  when you've collapsed a lot of comments on a reddit thread and don't want to uncollapse them all one by one
// @author       Antonio Lima
// @match        http://www.reddit.com/r/*/comments/*
// @match        https://www.reddit.com/r/*/comments/*
// @grant        none
// ==/UserScript==

$('#siteTable .flat-list').append('<li><a href="#" id="expander">expand all comments</a></li>');

$('#expander').click(function(e){
    if($('.comment').hasClass("collapsed")) {
        $('.comment').removeClass("collapsed");
        $('.comment').addClass("noncollapsed");
        $('.expand').html("[–]");
    }
    //hides back deleted comments and comments with score below threshold
    $('.collapsed-for-reason').removeClass("noncollapsed");
    $('.collapsed-for-reason').addClass("collapsed");
    $('.deleted').removeClass("noncollapsed");
    $('.deleted').addClass("collapsed");
    //prevents jump to the top of the page
    e.preventDefault();
});