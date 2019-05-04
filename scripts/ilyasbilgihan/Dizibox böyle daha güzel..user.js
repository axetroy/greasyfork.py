// ==UserScript==
// @author         @ilyasbilgihan
// @namespace      https://github.com/ilyasBilgihan
// @name           Dizibox böyle daha güzel.
// @description    Dizibox.com reklamlarını engelleme ve siteyi düzenleme.
// @icon           https://avatars0.githubusercontent.com/u/11466591
// @supportURL     https://dizibox.com
// @copyright      2016+, @ilyasbilgihan
// @match          *://www.dizibox5.com/*
// @require        https://code.jquery.com/jquery-2.2.4.min.js
// @version        2.7
// @license        Violent Monkey
// @grant          GM_setValue
// @run-at         document-end
// ==/UserScript==


(function() {
    if ($("video#dbx").length){

     $("video#dbx").removeAttr("autoplay");
     $('#gecbutonu').remove();
     $('#respond').remove();

    }

    $( "section:not(#new-series) .thumbnail-figcaption" ).each(function( index ) {
        var tempSerie = $( this ).find("b.series-name").text().toLowerCase();
        var newSeries = tempSerie.split(" ");
        $( this ).find("a").attr("href","diziler/" + newSeries.join("-") );
    });


    $('#pageskin').remove();
    var diziSayfasi = $('#archive-box').find('.figure').attr('href');
    var temp = $('span.tv-title-archive').find('span');
    temp.html('<a href="'+diziSayfasi+'" target="_blank">'+temp.text()+'</a>');

})();



GM_addStyle(`

	.col-1 { width: 100%!important; }
	.row {margin-bottom: 20px;}
	#like-box, .adv-header-bottom, .col-2.pull-right, #sub-menu .span-five, video#dbx, #adv-countdown { display: none!important; }
	.grid-four:nth-child(4n) {float:left!important; }
	.col-1.pull-left { width: 100%!important; }
	#adv-before-video-content {display: block!important; visibility: visible!important;}
	#main-wrapper, #site-header, #sub-menu, .form-control, .sce-comment-text, #searchform .icon, #video-area { background-color: rgba(27, 29, 31, 0.5)!important; }
	#alphabetical-category, .btn-default, .selectBox-dropdown, .video-toolbar, .woca-pagination .current, #site-footer, #popular-comments-home .featured-comment,#popular-comments-home .featured-comment .comment-header, .comment-list .comment .children, #seasons-list, #watched-season-wrapper, .btn-default-light { background-color: rgba(27, 29, 31, 0.75)!important; }
	.container, .translator, #comments, .comment-list .comment, .comment-bottom-bar, .bg-dark, #popular-comments-home .featured-comment { background-color: rgba(33, 36, 38, 0.75)!important; }


`);