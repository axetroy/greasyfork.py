// ==UserScript==
// @name         [DP] PlanetDP Nightmode
// @name:tr      [DP] PlanetDP Gece Modu
// @version      1.1
// @description  planetdp.org için gece modu!
// @description:tr planetdp.org için gece modu!
// @author       nht.ctn & hasangdr
// @icon         data:image/png;base64,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
// @namespace    https://twitter.com/hasangdr

// @match        https://www.planetdp.org/
// @match        https://www.planetdp.org/*
// @match        https://planetdp.org/
// @match        https://planetdp.org/*

// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // CSS'ler

    var styles =`




.cev p
{

    color: #ccc;

}

.form_main
{

    background: #1b1b1b;

}

.form_main_top_left h1
{

    color: #ccc;

}

.form_main_top_right h1
{

    color: #ccc;

}

.baba_main {

    background: #1b1b1b;
}

body {

  color: #ccc;
}

.baba_main_right h1 {

  color: #fff;
}

.baba_main_right strong {

  color: #fff;
}

.baba_main a {

  color: #eee;
}


.pd2 li {

    color: #fff;
}

.copy_main {

 background: #424242;

}

.copy_main_right a {

color: #ccc;

}

.copy_main_left {

background: #5d5c5c;

}

.copy_main_left p {

color: #fff;

}


.row1 td {

 background: #141414;

}

.row2 td {

 background: #14141452;

}

.row1ac td {

  background-color: #000!important;

}

.row2ac td {

 background-color: #000!important;

}

#subtable .row1:hover td, #listtable .row1:hover td, #subtable .row1:hover + tr td {

 background: #000;

}

#subtable .row1:hover td, #listtable .row1:hover td, #subtable .row1:hover+tr td {

 background color: #000;

}

#subtable .row2:hover td, #listtable .row2:hover td, #subtable .row2:hover + tr td {

 background: #000;

}


#subtable .row2:hover td, #listtable .row2:hover td, #subtable .row2:hover+tr td {

 background color: #000;

}

.selected_sub td {
    background-color: #000!important;
}

#subtable a {

color: #7f9bb5;

}

.sub_checked {
    color: green;
    text-shadow: 1px 1px 1px #000;

}

.sub_checked_orange {
    color: #ffa500;
    text-shadow: 1px 1px 1px #000;

}

.sub_checked_red {
    color: red;
    text-shadow: 1px 1px 1px #000;

}

.sub_checked_blue {
    color: #00f;
    text-shadow: 1px 1px 1px #000;

}

.star_color_3 {
    color: green;
    text-shadow: 1px 1px 1px #000;

}

.star_color_2 {
    color: #ffa500;
    text-shadow: 1px 1px 1px #000;

}

.star_color_1 {
    color: #349bf9;
    text-shadow: 1px 1px 1px #000;

}

.download-btn {
    color: #9c9c9c!important;
}

[data-user-liked~="no"][data-liketype~="icon"] {
    color: #9c9c9c!important;
}

[data-toggle="calendar"]>.row>.weekend {
    background-color: #1b1b1b;
}

.alpa_main_top h1 {
    color: #ccc;

}

.alpa_main {

 background: #1b1b1b;

}

.alpa_main_bott p {

color: #ccc;

}

.alpa_main_bott h2 {

color: #ccc;

}

.alpa_main_top ul li a {

color: #ccc;

}

.alpa_main_top ul li a:hover {
    background: #1f1f1f;
}

.alpa_main_bott span {
    color: #ffffff;

}

.wysibb {
    border: 1px solid #656565;
    background: #1f1f1f;

}

.wysibb .wysibb-toolbar .wysibb-toolbar-container .wysibb-toolbar-btn .fonticon {
    color: #fff;
    text-shadow: 0 1px 0 #000;

}


.wysibb .wysibb-toolbar {
    border-bottom: 1px solid #656565;

}

.wysibb .wysibb-toolbar .wysibb-toolbar-container {

    border-right: 1px solid #656565;

}

.bottom-resize-line:hover, .bottom-resize-line.drag {
    background: #656565;
}

.img-thumbnail {

    background-color: #ccc;
    border: 1px solid #ccc;


}

.video_main h1 {
    color: #ccc;

}

.video_main {

    background: #1b1b1b;

}

.white-popup-block {
    background: #1b1a1a;

}

.form-control {

background-color: #212121;
border: 1px solid #000;
color: #fff;

}

.content {

    background: #1b1b1b;

}

.mv-list h6 {
    color: #ccc;

}

.mv-listn h6 {
    color: #ccc;

}

.flexslider {

    background: #ccc;
    border: 4px solid #000;

}

.movie_list_top_left .ui-tabs-active .ui-tabs-anchor {
    background: #0e0e0e;

}

.list_main {

    background: #0e0e0e;
}

.movie_list_top_left li a {

    color: #fff;
    background: #1b1b1b;
}

div #new_sub_tab .ui-tabs-active .ui-tabs-anchor {
    background-color: #1b1b1b!important;
    color: #ff6d00!important;
}

.movie_list_top_right {

    background: #1b1b1b;
}

.movie_list_top {

    background: #1b1b1b;
}

.movie_list {

    background: #1b1b1b;

}

.list ul li a figure figcaption h4 {

    color: #fff;

}

.list ul li a figure figcaption span {

    color: #ccc;

}


.ha {

    color: #fff!important;

}

.blog_list-right p {

    color: #ccc;

}

.blog_list-right ul {

    border: dotted 1px #ccc;

}

.blog_list-right h4 {

    color: #ffff;
    border-bottom: dotted 1px #ccc;
}

.blog_list-right a i {
    color: #ccc;

}

.blog_list-right a {

    color: #fff;

}

.blog li a {
    background-color: #3d3d3d;
    color: #fff;

}

.trans-loading-one .progress {

    background: #96969646;
}



.progress__label {

    color: #ccc;

}

.video-sec {

    background: #1b1b1b;
}

.sec-three {

   background: #1b1b1b;

}

.video-loop h4 a {
    color: #fff;
}

.video-loop p {

    color: #cccc;
}

.video-loop figure {
    border: solid 1px #464646;

}


.sec-four {

    background: #1b1b1b;
}

.site-link ul li a {

    border-bottom: solid 1px #1b1b1b;

}

.bcumb a {
    color: #fff;
}

.blog-sec h3 {
    color: #fff;

}

.blog-sec h5 {
    color: #fff;

}

.all_text p {

    color: #ccc;

}

.read-btn a {
    border: dotted 1px #ccc;

}

.pagination>li>a, .pagination>li>span {
    border: 1px solid #525252;
    background-color: #000000;

}

.pagein .pagination>li>a, .pagination>li>span {
    border: solid 1px #525252;
    color: #fff;
}



.pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover {

    background-color: #676666;

}

.pagein2 .pagination>li>a, .pagination>li>span {
    background: #000000;
    color: #ffffff!important;

}


.yorum_main h5 {

    color: #ccc;
    border-bottom: solid 1px #4c4c4c;
}



.yorum_inp_msg {

    background-color: #171717;
    border: solid 1px #6f6e6e;
    color: #ccc;

}

.comment-form {

    border: solid 1px #4c4c4c;
}


.murat {

    border-bottom: solid 1px #4c4c4c;
}

.Toplam2 {

    color: #ccc;
    background-color: #383838;

}

.Toplam {

    color: #ccc;
    background-color: #383838;

}

.search_sub {

    background-color: #383838;

}

.subtitle1 a {
    color: #ccc!important;

}

.translate_list-right h4 {

    color: #fff;

}

.translate_list-right p {

    color: #ccc;

}

.input-group-addon {

    color: #fff;
    background-color: #151515;
    border: 1px solid #000

}

select.input-sm {

    color: #ccc;
}

.btn--warning {

    border: solid 1px #1b1b1b;
}

hr {

    border-top: 1px solid #000;
}

.img-thumbnail {
    background-color: #505050;
    border: 1px solid #505050;
}

.modal-header {

    border-bottom: 1px solid #000000;
}

.modal-footer {

    border-top: 1px solid #000000;
}

.modal-content {

    background-color: #141414;
    border: 1px solid #000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.translate_list-right2 h4 {
    font-size: 28px;
    color: #fff;
}

.pd li {

    color: #696969;
}

.translate_list-right2 p {

    color: #ccc;
}

.table-hover>tbody>tr:hover {
    background-color: #000000;
}

.btn-default {
    color: #ccc;
    background-color: #383838;
    border-color: #383838;
}

.btn-default:hover, .btn-default:focus {
    color: #ccc;
    background-color: #565656;
    border-color: #000;
}


.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {

    border-top: 1px solid #3a3a3a;
    border-bottom: 2px solid #3a3a3a;
}

.table>tbody>tr.active>td, .table>tbody>tr.active>th, .table>tbody>tr>td.active, .table>tbody>tr>th.active, .table>tfoot>tr.active>td, .table>tfoot>tr.active>th, .table>tfoot>tr>td.active, .table>tfoot>tr>th.active, .table>thead>tr.active>td, .table>thead>tr.active>th, .table>thead>tr>td.active, .table>thead>tr>th.active {
    background-color: #000;
}

.custom-table-style th {
    border: 3px solid #313131!important;
}

.custom-table-style tbody tr td:first-child {
    border-left: 3px solid #313131!important;
}

.custom-table-style tbody tr:nth-child(odd) {
    border-top: 3px solid #313131!important;
}

.custom-table-style tbody tr td:last-child {
    border-right: 3px solid #313131!important;
}

.custom-table-style tbody td {
    border: 1px solid #444444!important;
}

.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
color: #fff;
background-color: #1b1b1b;
border: 1px solid #313131;
border-bottom-color: transparent;
}

.nav-tabs>li>a:hover{
color: #4697dc;
border: 1px solid transparent;
border-bottom-color: #transparent;
}

.nav>li>a:focus, .nav>li>a:hover {
color: #4697dc;
text-decoration: none;
background-color: #3a3a3a;
border-bottom-color: #transparent;
}

.nav-tabs>li>a {
border: 1px solid transparent;
}


.well {

    background-color: #151414;
    border: 1px solid #e3e3e300;

}

.nav-tabs {
    border-bottom: 1px solid #313131;
}

.table>tbody>tr.info>td, .table>tbody>tr.info>th, .table>tbody>tr>td.info, .table>tbody>tr>th.info, .table>tfoot>tr.info>td, .table>tfoot>tr.info>th, .table>tfoot>tr>td.info, .table>tfoot>tr>th.info, .table>thead>tr.info>td, .table>thead>tr.info>th, .table>thead>tr>td.info, .table>thead>tr>th.info {
    background-color: #3a3a3a;
}

.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
    background-color: #463030;
    opacity: 1;
}

.plot-table tbody tr:hover {

    background: #000;
    background-color: #000;
}

.plot-table tbody tr:hover, .plot-table tbody tr tr:hover {

    background: #000;
    background-color: #000;
}

.plot-table thead tr:hover {

    background: #000;
    background-color: #000;
}

.plot-table tr:hover, .plot-table tr:nth-child(odd):hover+tr {
    background: #000;
}

.list-table .table-striped > tbody > tr :nth-of-type(n+1) {
    background: #141414;
}

.list-table .table-striped > tbody > tr:hover :nth-of-type(n+1) {
    background: #000;
}

.list-table table tr td {

    color: #fff;

}



.panel-default>.panel-heading {
    color: #fff;
    background-color: #3a3a3a;
    border-color: #000;
}

.panel-body {

    background: #3a3a3a;

}

.panel-default {
    border-color: #000;
}

.alert-info {
    color: #fff;
    background-color: #696969;
    border-color: #000000;
}

.videos-loop h4 a {
    color: #fff;
}

.videos-loop figure {
    border: solid 1px #464646;

}

.search_inp {

    border: solid 1px #464646;

}


.search_inp2 {

    border: solid 1px #464646;

}


.search_inp8 {

    border: solid 1px #464646;

}

.diger_main {

    background: #1b1b1b;

}

.diger_main h1 {
    color: #ccc;

}

.murat_right p {

    color: #ccc;

}

.murat_right h3 span {

    color: #ccc;
}

button, input, select, textarea {
   
    background-color: #1b1b1b;
}

code {
    background-color: #1f1f1f;
}

.mfp-close-btn-in .mfp-close {
    color: #f00;
}

.close {
   
    color: #f00;
    text-shadow: 0 1px 0 #000;
    filter: alpha(opacity=20);
    opacity: 100;
}

.close:hover {
   
    color: #940a0a;
    text-shadow: 0 1px 0 #000;
    filter: alpha(opacity=20);
    opacity: 100;
}

.white-popup {

    background: #292929;

}

.commentlistdiv {

    background: #292929;
}

.tt-suggestion {

    background: #292929;
}

.tt-menu {

    background-color: #292929;

}

.social ul li a {

    background: #101010;
}


.wysibb .wysibb-toolbar .wysibb-toolbar-container .wysibb-toolbar-btn.on, .wysibb .wysibb-toolbar .wysibb-toolbar-container .wysibb-toolbar-btn.on:hover, .wysibb .wysibb-toolbar .wysibb-toolbar-container .wysibb-toolbar-btn:active {
    background: #000000;
    box-shadow: inset 0 0 3px #101010;
    border: 1px solid #000000;
}

.trans-percentage a {
    color: white;
}

.ara_search2 {

    background-color: #0c0c0c;

}

.ara_search2:hover {

    background-color: #000;

}

.search_inp_select {

    border: solid 1px #464646;
    background-color: #1b1b1b;
}


.pagein2 .pagination>li>a:focus, .pagination>li>a:focus, .pagination>li>span:focus, .pagination>li>span:focus {
    background: #ff6d00;
    border: solid 1px #ff6d00;
    color: #fff;
}


div > h1 > a[href="/todaywatchs"]
{
    color: white!important;
}


div h3[style*="padding-bottom: 5px;color: darkblue;"]
{
    padding-bottom: 5px;
    color: #4b4bee!important;
}


#side-progress > .progress
{
    background-color: #0c0d0d!important;
}


#side-progress > .progress > .progress__label
{
    color: white!important;
}

.popover-title {
    background-color: #000;
    border-bottom: 1px solid #000;
}

.popover.calendar-event-popover {
    color: #ccc;
    background: #1b1a1a;
}

#subdetailform a[style*="color: black;"], #subdetailform ul.pd > li > a
{
    color: #ccc!important;
}

#subdetailform ul.pd > li > a:hover
{
    color: rgb(253, 96, 0)!important;
}

.mfp-content > .container {

    background-color: #1b1a1a!important;
}

.list-group-item {

    background-color: #000;
    border: 1px solid #3a3a3a;
}

.panel-default>.panel-heading+.panel-collapse>.panel-body {
    border-top-color: #000;
}

.pagein .pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover {
background: #ff6d00;
}

.custom-table-style-plot th {
    border: 3px solid #313131!important;
}

.custom-table-style-plot tbody tr td:last-child {
    border-right: 3px solid #313131!important;
}

.custom-table-style-plot tbody tr td:first-child {
    border: 3px solid #313131!important;
}

.custom-table-style-plot tbody td {
    border: 1px solid #313131!important;
}

.fa-times-circle:before {

    background: #f60;
}

`

    GM_addStyle( styles );


//================================================

  // JAVASCRIPT
    var pageUrl = window.location.href;

    document.querySelector( 'html body' ).insertAdjacentHTML( "afterbegin", '<info id="dpDarkThemeByGdr" style="display: none;"></info>' );

    // Kartın altındaki siyah ikonlar
    if (pageUrl.search( /planetdp\.org\/title/ ) >= 0)
    {
        document.querySelector( '.one .abd_ticon img' ).src = "https://images2.imgbox.com/a4/4c/ipGbwJRR_o.png";
        document.querySelector( '.two .abd_ticon img' ).src = "https://images2.imgbox.com/9d/db/74HXU0pP_o.png";
        document.querySelector( '.three .abd_ticon img' ).src = "https://images2.imgbox.com/ed/17/Dw1tIQEE_o.png";
        document.querySelector( '.four .abd_ticon img' ).src = "https://images2.imgbox.com/3c/1b/XYj6fHYn_o.png";
        document.querySelector( '.five .abd_ticon img' ).src = "https://images2.imgbox.com/d5/66/YBUUmq16_o.png";
    }


    // Varsayılan Afiş
    var defaultPosters = document.querySelectorAll('img[src="https://planetdp.org//themes/newtheme/images/default.png"], img[src="https://www.planetdp.org//themes/newtheme/images/xdefault.png.pagespeed.ic.4q79YiUNwg.webp"]');
    if ( defaultPosters.length > 0 ) {
    for ( var x = 0; x < defaultPosters.length; x++ )
    {
        defaultPosters[x].src = "https://images2.imgbox.com/df/9b/yABfQiII_o.png"
    }
    }

    // Kart Raporlama - Açılır pencere
     waitForKeyElements( "div.mfp-content .row", function() { document.querySelector( 'div.mfp-content .row' ).style.background = "#1b1a1a"; } );
    //waitForKeyElements( ".form-control", function() { GM_addStyle( ".form-control { background-color: #212121; border: 1px solid #000; color: #ccc; }" ); } );

    // Kartın altındaki siyah ikonlar
    if (pageUrl.search( /planetdp\.org\/title/ ) >= 0)

    {
        document.querySelector( '.one .abd_ticon img' ).src = "https://images2.imgbox.com/a4/4c/ipGbwJRR_o.png";
        document.querySelector( '.two .abd_ticon img' ).src = "https://images2.imgbox.com/9d/db/74HXU0pP_o.png";
        document.querySelector( '.three .abd_ticon img' ).src = "https://images2.imgbox.com/ed/17/Dw1tIQEE_o.png";
        document.querySelector( '.four .abd_ticon img' ).src = "https://images2.imgbox.com/3c/1b/XYj6fHYn_o.png";
        document.querySelector( '.five .abd_ticon img' ).src = "https://images2.imgbox.com/d5/66/YBUUmq16_o.png";
    }

    function waitForKeyElements (
        selectorTxt,    /* Required: The jQuery selector string that
                            specifies the desired element(s).
                        */
        actionFunction, /* Required: The code to run when elements are
                            found. It is passed a jNode to the matched
                            element.
                        */
        bWaitOnce,      /* Optional: If false, will continue to scan for
                            new elements even after the first match is
                            found.
                        */
        iframeSelector  /* Optional: If set, identifies the iframe to
                            search.
                        */
    ) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined")
            targetNodes     = $(selectorTxt);
        else
            targetNodes     = $(iframeSelector).contents ()
                                               .find (selectorTxt);

        if (targetNodes  &&  targetNodes.length > 0) {
            btargetsFound   = true;
            /*--- Found target node(s).  Go through each and act if they
                are new.
            */
            targetNodes.each ( function () {
                var jThis        = $(this);
                var alreadyFound = jThis.data ('alreadyFound')  ||  false;

                if (!alreadyFound) {
                    //--- Call the payload function.
                    var cancelFound     = actionFunction (jThis);
                    if (cancelFound)
                        btargetsFound   = false;
                    else
                        jThis.data ('alreadyFound', true);
                }
            } );
        }
        else {
            btargetsFound   = false;
        }

        //--- Get the timer-control variable for this selector.
        var controlObj      = waitForKeyElements.controlObj  ||  {};
        var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
        var timeControl     = controlObj [controlKey];

        //--- Now set or clear the timer as appropriate.
        if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
            //--- The only condition where we need to clear the timer.
            clearInterval (timeControl);
            delete controlObj [controlKey]
        }
        else {
            //--- Set a timer, if needed.
            if ( ! timeControl) {
                timeControl = setInterval ( function () {
                        waitForKeyElements (    selectorTxt,
                                                actionFunction,
                                                bWaitOnce,
                                                iframeSelector
                                            );
                    },
                    300
                );
                controlObj [controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj   = controlObj;
    }

})();