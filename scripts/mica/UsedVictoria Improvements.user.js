// ==UserScript==
// @name         UsedVictoria Improvements
// @description  Provides higher resolution, uncropped thumbnails with hover preview, tidies up the layout, removing extraneous page sections, and fixes a few bugs
// @version      0.4
// @author       mica
// @namespace    greasyfork.org/users/12559
// @match        *://*.usedvictoria.com/*
// ==/UserScript==

$('head').append(`
<style>
/* results list item spacing */
    ul.usedlist > li:first-of-type {
        padding-top: 3px;
    }
    ul.usedlist > li:last-of-type {
        padding-bottom: 3px;
    }
    li > .article {
        padding: 3px 6px;
    }
/* results info formatting */
    .useditem-header {
        border: 2px solid #ccc !important;
        height: 165px !important;
        margin-left: 229px !important;
        padding: 0 !important;
    }
    .info {
        margin: 36px 10px 0 16px;
        line-height: 18px;
    }
    .info .price {
        position: absolute;
        top: 11px;
        left: 11px;
        color: #37b3a5;
        font-size: 145%;
        font-weight: 600;
    }
    .info .locale {
        position: absolute;
        bottom: 6px;
        left: 11px;
        font-size: 12px;
    }
    .adbreadcrumbs { /* category */
        position: absolute !important;
        bottom: 4px;
        right: 8px;
    }
    .usedlist .favourite { /* heart icon */
        top: 3px;
        right: 0;
    }
/* image thumbnails */
    .article > .img-border {
        width: 220px;
        height: 165px;
        text-align: center;
        overflow: visible;
    }
    .img-thumbnail {
        width: auto !important;
        max-width: 100%;
        max-height: 100%;
        border: 2px solid #bbb;
    }
/* image hover preview */
    #img-preview {
        position: absolute;
        z-index: 3;
        display: none;
    }
    #img-preview img {
        max-height: 500px;
        max-width: 500px;
        border: 3px solid #aaa;
    }
/* corner rounding */
    #ad > .header, #useditem-details, .img-thumbnail, #img-preview img { /* all */
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
    }
    .section-content > .rborder-full, .category-details, .img-border { /* none */
        border-radius: 0;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
    }
    .footer.rborder-full { /* bottom only */
        border-radius: 0 0 5px 5px;
        -webkit-border-radius: 0 0 5px 5px;
        -moz-border-radius: 0 0 5px 5px;
    }
    .header.rborder-full, #subcategory { /* top right only */
        border-radius: 0 5px 0 0;
        -webkit-border-radius: 0 5px 0 0;
        -moz-border-radius: 0 5px 0 0;
    }
    .wrapper.used-menu { /* bottom left only */
        border-radius: 0 0 0 5px;
        -webkit-border-radius: 0 0 0 5px;
        -moz-border-radius: 0 0 0 5px;
    }
    #titletools { /* no bottom left */
        border-radius: 5px 5px 5px 0;
        -webkit-border-radius: 5px 5px 5px 0;
        -moz-border-radius: 5px 5px 5px 0;
    }
/* page layout */
    .wrapper {
        width: 1050px;
        padding: 0 !important;
    }
    .grid-8 {
        width: 700px;
    }
    .header.rborder-full, .footer.rborder-full, .article > .img-border {
        margin: 0 !important;
    }
    #top-menu, .wrapper.used-menu {
        margin-bottom: 10px;
    }
    #used-info { /* footer */
        margin-top: 100px;
    }
/* misc */
    li.premium { /* disable turquoise results */
        background-color: inherit !important;
    }
    #header-tools { /* fix unselectable search text */
        width: auto !important;
    }
    #contact-details { /* fix location overflow */
        overflow: hidden;
    }
</style>
`);

// fix HTML symbol entities in page titles
$('title').html(document.title);
// remove Featured Ad section
$('#featured-head').prev('.adshead').andSelf().remove();
// remove Top Ads section
$('#top-head').next('.rborder-full').andSelf().remove();
$('.show-all').remove();
// remove Ad Gallery section
$('.adshead.galleryheader').next('.rborder-full').andSelf().remove();
// remove Trending Ads section
$('#trend').remove();
// remove Recent Ads title bar
$('#recent-head').remove();
// remove Usedful News sections
$('#branded-carousel, #branded-side-widget').remove();
// remove Location menu and Used Cities footer
$('#siteSelect, #used-footer').remove();
// remove Rocket and Used.ca App icons from results
$('.icon-container, li > a.limit').remove();
// remove external ads
$('#afshcontainer, .sponsoredads-outer, .ad-banner, .boxad, li:contains("adsbygoogle"), .adsbygoogle, div[id*="teaser"], div[id*="div-gpt-ad"]').remove();
// check Terms of Use box
$('#confirmTerms').prop('checked', true);

// reformat results list info
$('.article > .useditem-header').each(function() {
    $(this).prepend('<div class="info">');
    // get .price from .title
    price = $('.title a', this).html().match(/\$.*?(?=&nbsp;)/);
    if (price != null) {
        $('.info', this).prepend('<p class="price">' + price + '</p>');
        title = $('.title a', this).html().match(/·&nbsp;(.*)/)[1];
        $('.title a', this).html(title);
    }
    // move .title and .desciption into .info
    $('.title, .description', this).appendTo($('.info', this));
    // put .username location into .locale
    locale = $('.username', this).clone().children().remove().end().text().match(/(\S.*?)(?=[:(&\n])/);
    if (locale != null) {
        $('.info', this).append('<p class="locale">' + locale[1] + '</p>');
    }
    // move/remove misc elements
    $('.property > .adbreadcrumbs', this).appendTo(this);
    $('.property, .username', this).remove();
    $(this).parent().siblings('a.favourite.addfav').appendTo($(this))
});

// load hi-res thumbnails and remove generic category pics
$('.article > .img-border a img').each(function() {
    if ($(this).attr('src').match('noadpic')) {
        $(this).remove();
    } else {
        src = $(this).attr('src').replace('_114.jpg', '_614.jpg');
        $(this).attr('src', src);
    }
    $(this).addClass('img-thumbnail');
});

// preview image on hover
yOffset = 180;
xOffset = 15;
$('.img-thumbnail').hover(function(e) {
    $('body').append("<p id='img-preview'><img src='"+ this.src +"' /></p>");
    $('#img-preview')
        .css('top', (e.pageY + yOffset) + 'px')
        .css('left', (e.pageX - xOffset) + 'px')
        .fadeIn('fast');
    }, function(){
    $('#img-preview').remove();
});
$('.img-thumbnail').mousemove(function(e){
    $('#img-preview')
        .css('top', (e.pageY - yOffset) + 'px')
        .css('left', (e.pageX + xOffset) + 'px');
});
