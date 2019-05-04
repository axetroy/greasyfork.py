// ==UserScript==
// @name         Cowlevel Deep Blue
// @namespace    Arc
// @version      1.8.3
// @description  A Solarized like dark theme for Cowlevel.net. Repository: https://github.com/Arcadia822/cowlevel_deep_blue
// @author       Arcadia
// @match        https://*.cowlevel.net/*
// ==/UserScript==




// Color Palette by Paletton.com
// Palette URL:
// http://paletton.com/#uid=73B1q0kkDcj63jybndRts8ARM6w


// Primary color:

var MAIN_COLOR_0='rgb(26,44,64)';
var MAIN_COLOR_1='rgb(84,92,102)';
var MAIN_COLOR_2='rgb(48,60,72)';
var MAIN_COLOR_3='rgb(7,25,45)';
var MAIN_COLOR_4='rgb(1,16,34)';
var MAIN_COLOR_0_1='rgba(26,44,64,0.1)';
var MAIN_COLOR_0_2='rgba(26,44,64,0.4)';
var MAIN_COLOR_0_3='rgba(26,44,64,0.9)';
var MAIN_COLOR_0_4='rgba(26,44,64,1)';

// Secondary color (1):

var SECOND_COLOR_0 = 'rgb(70, 25, 62)';
var SECOND_COLOR_1 = 'rgb(112, 91,108)';
var SECOND_COLOR_2 = 'rgb(79, 51, 74)';
var SECOND_COLOR_3 = 'rgb(49,  4, 40)';
var SECOND_COLOR_4 = 'rgb(37,  0, 30)';

// Secondary color (2):

var THIRD_COLOR_0 = 'rgb(80, 94, 33)';
var THIRD_COLOR_1 = 'rgb(142,149,121)';
var THIRD_COLOR_2 = 'rgb(97,105, 68)';
var THIRD_COLOR_3 = 'rgb(52, 65,  5)';
var THIRD_COLOR_4 = 'rgb(38, 50,  0)';

// Complement color:

var COM_COLOR_0 = 'rgb(98, 73, 35)';
var COM_COLOR_1 = 'rgb(156,144,126)';
var COM_COLOR_2 = 'rgb(110, 95, 71)';
var COM_COLOR_3 = 'rgb(68, 44,  5)';
var COM_COLOR_4 = 'rgb(52, 31,  0)';

// Generated by Paletton.com (c) 2002-2014


var MAIN_BG_COLOR = MAIN_COLOR_0;
var SECOND_BG_COLOR = MAIN_COLOR_3;
var LIGHT_BG_COLOR = MAIN_COLOR_2;
var RED_BG_COLOR = SECOND_COLOR_0;
var INPUT_BG_COLOR = MAIN_BG_COLOR;


function addGlobalStyle(css) {
    var style = document.createElement('style');
    //style.type = 'text/css';
    style.innerHTML = css;
    document.body.appendChild(style);
}

function changeInlineAttrBySelector(selector, attr_name, css) {
    try {
        $(selector).css(attr_name,css);
    }
    catch (err) {
    }
}

(function() {
    'use strict';
    // Your code here...

    var css_value=`
        /* header */
        #snow-target.header-nav {
            background: `+SECOND_BG_COLOR+` !important;
        }
        .top-nav {
            background: `+SECOND_BG_COLOR+` !important;
        }
        .bottom-nav {
            background: `+SECOND_BG_COLOR+` !important;
        }
        nav.header-nav.clearfix {
            background: `+SECOND_BG_COLOR+` !important;
        }


        /* body */
        article.main.wrap-outer {
            background: `+MAIN_BG_COLOR+` !important;
        }
        article.main {
            background: `+MAIN_BG_COLOR+` !important;
        }

        /*
        body > article > section {
            background: `+MAIN_BG_COLOR+` !important;
        }
        */

        body {
            background: `+MAIN_BG_COLOR+` !important;
        }


        /* footer */
        .footer {
            background: `+MAIN_BG_COLOR+` !important;
        }


        /* transparent background*/
        .bg-gradient {
            background: -moz-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* ff3.6+ */
            background: -webkit-gradient(linear, 0 10%, 0 100%, from(`+MAIN_COLOR_0_1+`), to(`+MAIN_COLOR_0_4+`)) !important;
            background: -webkit-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* safari5.1+,chrome10+ */
            background: -o-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* opera 11.10+ */
            background: -ms-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* ie10+ */
            background: linear-gradient(180deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* w3c */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1A2C40', endColorstr='#1A2C40',GradientType=0 ); /* ie6-9 */
        }

        .bg-gradient-2 {
            background: -moz-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* ff3.6+ */
            background: -webkit-gradient(linear, 0 10%, 0 100%, from(`+MAIN_COLOR_0_1+`), to(`+MAIN_COLOR_0_4+`)) !important;
            background: -webkit-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* safari5.1+,chrome10+ */
            background: -o-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* opera 11.10+ */
            background: -ms-linear-gradient(270deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* ie10+ */
            background: linear-gradient(180deg, rgba(26,44,64,0.1) 0%, rgba(26,44,64,0.1) 10%, rgba(26,44,64,1) 100%); /* w3c */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1A2C40', endColorstr='#1A2C40',GradientType=0 ); /* ie6-9 */
        }

        .bg-gradient-3{
            background: -moz-linear-gradient(270deg, rgba(26,44,64,0) 0%, rgba(26,44,64,0) 20%, rgba(26,44,64,1) 85%, rgba(26,44,64,1) 100%); /* ff3.6+ */
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(26,44,64,0)), color-stop(20%, rgba(26,44,64,0)), color-stop(85%, rgba(26,44,64,1)), color-stop(100%, rgba(26,44,64,1))); /* safari4+,chrome */
            background: -webkit-linear-gradient(270deg, rgba(26,44,64,0) 0%, rgba(26,44,64,0) 20%, rgba(26,44,64,1) 85%, rgba(26,44,64,1) 100%); /* safari5.1+,chrome10+ */
            background: -o-linear-gradient(270deg, rgba(26,44,64,0) 0%, rgba(26,44,64,0) 20%, rgba(26,44,64,1) 85%, rgba(26,44,64,1) 100%); /* opera 11.10+ */
            background: -ms-linear-gradient(270deg, rgba(26,44,64,0) 0%, rgba(26,44,64,0) 20%, rgba(26,44,64,1) 85%, rgba(26,44,64,1) 100%); /* ie10+ */
            background: linear-gradient(180deg, rgba(26,44,64,0) 0%, rgba(26,44,64,0) 20%, rgba(26,44,64,1) 85%, rgba(26,44,64,1) 100%); /* w3c */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1A2C40', endColorstr='#1A2C40',GradientType=0 ); /* ie6-9 */
        }

        .tip-window {
            background: `+MAIN_COLOR_0_4+`
        }


        /* settings */
            div.setting-card {
            background: `+SECOND_BG_COLOR+`
        }


        /* invite */
        section.invite-header.flex-box {
            background: `+SECOND_BG_COLOR+`
        }


        /* editor */


        /* layui */
        .layui-layer-wrap {
            background: `+MAIN_BG_COLOR+`
        }
        #layui-layer1 > div {
            background: `+MAIN_BG_COLOR+`
        }
        .layui-layer-title {
            background: `+MAIN_BG_COLOR+`
        }
        .feedback-layer {
            background: `+MAIN_BG_COLOR+`
        }
        .layer {
            background: `+MAIN_BG_COLOR+`
        }


        /* element */
        .vm-draft-card {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-article {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-answer {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-question {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-review {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-game {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-played {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-answer-comment {
            background: `+SECOND_BG_COLOR+`
        }
        div.vm-personal-card > .clearfix {
            background: `+LIGHT_BG_COLOR+`
        }
        .vm-style-double-bevel {
            background: `+LIGHT_BG_COLOR+`;
            padding-top: 3px
        }
        .vm-layer-more-user {
            background: `+MAIN_BG_COLOR+`
        }
        .vm-element-item {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-element-item.white.on {
            background: `+RED_BG_COLOR+`
        }
        .vm-element-game-item {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-element-header {
            background: `+SECOND_BG_COLOR+`
        }
        section.vm-user-item-card {
            background: `+SECOND_BG_COLOR+`
        }
        section.vm-invitation-item.bg-img {
            background-image: url("http://www.mountnoon.com/assets/files/2017-03-22/04:07:240-ticket2x-solarized.png")
        }
        .vm-feed-card-pic {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-video {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-feed-card-article-comment {
            background: `+SECOND_BG_COLOR+`
        }
        .vm-quote-article {
            background: `+LIGHT_BG_COLOR+`
        }


        /* comments */
        .comments.wrapper.fat-footer {
            background: `+SECOND_BG_COLOR+`
        }
        .comments {
            background: `+MAIN_BG_COLOR+`
        }


        /* other */
        .open-layer {
            background: `+SECOND_BG_COLOR+`
        }
        .setting-list {
            background: `+SECOND_BG_COLOR+`
        }
        .single-post {
            background: `+MAIN_BG_COLOR+`
        }


        .btn-card-border {
            background: `+SECOND_BG_COLOR+`
        }
        .notice-tip-window {
            background-color: `+MAIN_BG_COLOR+`
        }
        .notice-tab li.weidu {
            background-color: `+MAIN_BG_COLOR+`
        }
        .tip-tag {
            background: `+SECOND_BG_COLOR+`
        }
        div.tip-game {
            background: `+SECOND_BG_COLOR+`
        }
        .hot-box.cl-card {
            background: `+SECOND_BG_COLOR+`
        }
        .swiper-slide.cl-shadow.block {
            background: `+SECOND_BG_COLOR+`
        }
        .wanguo-swiper.shouchang-swiper.swiper-slide {
            background: `+SECOND_BG_COLOR+`
        }
        section.vm-avatar.flex-box {
            background: `+SECOND_BG_COLOR+`
        }
        .left-bevel {
            display: none
        }
        .right-bevel {
            display: none
        }
        .cl-card {
            background: `+SECOND_BG_COLOR+`
        }
        div.desc.sticky-box > .flex-box.flex-align-items-center.footer-info-box {
            background: `+SECOND_BG_COLOR+`
        }
        div.tag-box.white {
            background: `+SECOND_BG_COLOR+`
        }
        div.tag-box.white.on {
            background: `+RED_BG_COLOR+`
        }
        div.tag-box.white.hover {
            background: `+LIGHT_BG_COLOR+`
        }
        .add-question-box {
            background: `+SECOND_BG_COLOR+`
        }
    `;
    addGlobalStyle(css_value);


    //change in-line style
    /* body */
    changeInlineAttrBySelector("v3-main", "background", MAIN_BG_COLOR);
    changeInlineAttrBySelector("body > article:nth-child(13)", "background", MAIN_BG_COLOR);

    /* editor */
    changeInlineAttrBySelector(".fr-counter", "background", INPUT_BG_COLOR);
    changeInlineAttrBySelector(".fr-basic", "background", INPUT_BG_COLOR);

    /* transparent background */
})();
