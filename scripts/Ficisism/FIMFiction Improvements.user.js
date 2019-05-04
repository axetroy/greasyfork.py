// ==UserScript==
// @name         FIMFiction Improvements
// @version      0.1.4
// @description  Improves FIMFiction in a variety of ways.
// @author       Ficisism
// @match        http://www.fimfiction.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @locale       English
// @namespace http://your.homepage/
// ==/UserScript==

//trimming function
function isEmpty( el ){
      return !$.trim(el.html());
}

$(document).ready(function() {
    //removes the gradient and shadow to the right on all pages
    $(".light-gradient").remove();
    $(".sidebar-shadow").remove();
        
    
    //if there are no comments on a blog post or story, removes the 2nd toolbar
    if (isEmpty($(".comment_list"))) {
        $('.light_toolbar_bottom').remove();
    }
    
    //fix for front page toolbar shifting
    $('.button-first').css("margin-left", "-1px");
    
    //add "add blog" button
    $("head").append('<style> .addblog_link:before{ content: "\\f040" !important;}\</style>');
    $("#form_search_sidebar").before('<div class="link_container"><div class="feed_link addblog_link"></div><a href="/manage_user/edit_blog_post" class="link" title="Post new blog"></a></div>');
    
    //removes the page flip on mouseover
    $(".story-card-container").removeClass("story-card-container");
});