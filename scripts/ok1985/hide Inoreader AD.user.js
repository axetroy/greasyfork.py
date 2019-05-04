// ==UserScript==
// @name hide Inoreader AD
// @description hide remove Inoreader AD 
// @version 1.0.6
// @grant none
// @noframes
// @include http://www.inoreader.com/*
// @include https://www.inoreader.com/*
// @icon http://www.inoreader.com/favicon.ico
// @namespace   https://greasyfork.org/zh-CN/scripts/8973-hide-inoreader-ads
// @copyright  反馈和建议(feedback)E-mail: nolazyload@foxmail.com
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = `
.block_article_ad,
.ad_title,
#consent_bbb,
#sinner_container,
#sb_rp_upgrade_button,
div.trc_rbox_container,
div.ad_size_large_rectangle,
div[class^='inno_dialog_modal_overlay'],
div[class^='inno_dialog inno_shadow_big open_sans inno_dialog_modal'],
div.sinner_under_footer{display: none !important;}
#reader_pane.reader_pane_sinner{padding-right:0px;}
#folder_dialog_wrapper,
#login_dialog_wrapper,
#folder_dialog_modal_overlay{display: block !important;}
`;
document.documentElement.appendChild(styleEl);

