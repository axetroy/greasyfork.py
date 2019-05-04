// ==UserScript==
// @name         煎蛋嘿嘿嘿夜间主题
// @namespace    https://greasyfork.org/en/scripts/32730
// @version      0.1
// @description  让煎蛋嘿嘿嘿!
// @author       MapleRecall
// @match        http://jandan.net/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    var css='#content .f,#content .s,#content .title{border-bottom-color:#323232}#authorbar,#sidebar .s_related li{border-top-color:#323232}#sidebar .tags a,.hot-tabs .hot-tab{border-right-color:#323232}body,html{background-color:#212121;color:#bababa}a,a:link,a:visited{color:#bababa;transition:color .1s}a:hover{color:#ff4500}.righttext,.righttext a{color:#969599}hr{border-color:#434343}#body,#commentform #submit,#footer,.postnav a{border-color:#323232}#header .logo h1 a{background-image:url(data:image/gif;base64,R0lGODlheAAyAKIGAP//AP/MAP9mM/8zM8zMzDMzM////wAAACH5BAEAAAYALAAAAAB4ADIAAAP/aLrc/jDKSau9OOvNu/9gKI5kaZ7MMKBsu6luLEsqPN9zveK8CfzA4K9H/AiPgKLygmwKl9CHc5qMWqnYqlWZpW6L3e6XF86OcWXs+Zb2rl2BQLNQmNeR8Qthz+8THH59EYGEhYZ7DnF2i3gBeoeAhYOHlJANim1OeRaUkYSTlaF+iXKZTZsSoqp8nquhDGUCsgJlqa6iG58Mugqxs7Wgt50NkruBFm2ztGkQwq/EvAq4Dsm/zErFC9MLpt1DRc7RBt7dD6vSowbH0OGCsOSZ5qro7uvGtxTw8a2V9Kzq6e61I6Svjbxp6+xpEyes4DV2zxIGXKgQoKsjmApm/AYR2hHFfxLdZWgoZCM8kwcjpqvIiaWEOCbJwXQUrJ9FkBP9DZw40yGAmbYQrsx5c6fIBTG9oao5LOQ/gUafIi2lkWZQqU49sozKMmm3pc3mFf0zlp/UsWQ/njXg1RTYlDazplV7lqFLtlS/Wp1wrqxfqFwhtA3zNqzQekS5EmUweEphpnTJyjUb9WXeMo8NP9U1uWPgCXHozBwNU/TeN1fXaghdgDRp06griOtAh0LtXAHFblWs+sFtCb9H5j68lndvBnSSF4CgPHhLkboTG5/LvHl15RrsRT+qk2sCADs=);filter:drop-shadow(0 1px 3px #993)}#body{background-image:linear-gradient(to top,#323232,#323232);background-size:1px 1px}#nav_next a,#nav_prev a{color:#b3b3b3}#nav_next a:hover,#nav_prev a:hover{color:#878787}#nav_top{background-color:#323232;color:#bfbfbf}#nav_top:hover{background-color:#878787}#content .photos h3,#content h3,#content h3 a{color:#bababa}#content .title{background-color:#272727;color:#afafaf}#content .title a{color:#afafaf}#content .post p a,#content .post p a:link,#content .post p a:visited{border-bottom-color:#218787;color:#bababa}#content .post p a:hover{color:#D33}#content .post li a,#content .post li a:link,#content .post li a:visited{border-bottom-color:#218787;color:#bababa}#content .post em a,#content .post em a:link,#content .post em a:visited,#content .post h1,#shang-iframe .shang-iframe-title,#sidebar .tags a,#sidebar ol,#sidebar ul,.commentlist .row,.cp-pagenavi,.hot-tabs,.tucao-hot-title,.tucao-row{border-bottom-color:#323232}#content .post li a:hover{color:#D33}em{color:#727272}#content .post em a,#content .post em a:link,#content .post em a:visited{color:#6a6a6e}#content .post em a:hover{color:#D33}#content .post del{background-color:#434343;color:#6a6a6e}#content .post blockquote{background-color:#282828;border-left-color:#323232;color:#bababa}#content .post blockquote.block{background-color:#31312c}#content .post strong.highlight{background-color:#213265}#content .post h4{border-left-color:#D33}#content .post h4.pullquote{background-color:#2d2d21;border-left-color:#444421}#content .post .time_s,#content .post .time_s a{color:#727272}#content .comment-link{color:#999}#content .comment-link a{color:#8c8c8c}#content .comment-big a{color:#b2b2b2}#content .post h1 a,.post h2 a{color:#ec5747}#content .post h1 a:hover,.post h2 a:hover{color:#4285F4}#content .other h3{color:#7f7f7f}.commentlist .time a{color:#969599}.commentlist .author small a{color:#999}#sidebar h3,#sidebar ol{color:#7f7f7f}#commentform input#author,#commentform input#email,#commentform input#url,#commentform textarea{border-color:#323232;background:#333;color:#ccc}#commentform input#author:hover,input#email:hover,input#url:hover{background:#333;color:#ccc}#commentform #submit{background-color:#272727;color:#ccc}.commentlist .tip .row{background-color:#282828}#sidebar form{border-bottom-color:#323232;background-color:#272727}#sidebar form input{background-color:#272727;color:#727272}#sidebar .tags a{color:#444}#sidebar .tags a:hover{background-color:#444;color:#bfbfbf}#sidebar .links a,#sidebar .links a:hover{color:#444}#sidebar #float{background-color:#212121}#sidebar .s_title{color:#af3227}#sidebar .s_title:hover{color:#4285F4}#footer,#footer a{color:#7f7f7f}.postnav a{background-color:#272727;color:#727272}.postnav a:hover{border-color:#D33;color:#444}#shang-iframe,.hot-tabs li,.jandan-tucao,.tucao-hot,.wp-pagenavi .current,.wp-pagenavi .pages{border-color:#323232}.wp-pagenavi{color:#7f7f7f}.wp-pagenavi a{background-color:#545454;color:#bfbfbf}.wp-pagenavi a:hover{color:#212121}.wp-pagenavi .pages{background-color:#2e2e2e}.cp-pagenavi a{background-color:#545454;color:#bfbfbf}.cp-pagenavi a:hover{background-color:#444}.cp-pagenavi .current-comment-page{border-color:#323232;color:#7f7f7f}.acv_author{background-color:#2b2b2b}.vote,.vote a{color:#969599}.acv_comment{background:#212121}.acv_comment .show_more{background-color:#000;color:#bfbfbf}.acv_comment .vote{background-color:#212121}.acv_author{color:#7f7f7f}.acv_author a{color:#555}.acv4:link{color:#217676}.acva:link{color:#767621}.acv4:link:hover{color:red}.acva:link:hover{color:#00F}#authorbar{background-color:#2f2f2f}#authorbar a{color:#555}.gif-mask,.video-mask{background-color:#000;color:#bfbfbf}.host-list-split,.hot-tabs li.current{background-color:#323232}.hot-tabs li.current{font-weight:700}a.share-link-weibo,a.share-link-weixin{color:#bfbfbf}.share-link-weibo{background-color:#F55}.share-link-weixin{background-color:#34A853}.post a.jandan-zan{background-color:#295377;color:#bfbfbf}.post a.jandan-zaned:hover{color:#767676}.list-post a.jandan-zan{color:#d4d4d4}.list-post a.jandan-zan:visited{color:#212121}.list-post a.jandan-zan:hover{color:#4285F4}.list-post a.jandan-zaned{color:#bf5f1d}.headline .cat-link{color:#727272}.block-panel span:hover{color:red}a.view_img_link{color:#7f7f7f}.hot-tabs .current-tab{color:#cbcbcb;background-color:#313131}#shang-button{background-color:#FF7F27;color:#bfbfbf}#shang-content,.shang .shang-peoples{color:#989898}#shang-content .shang-submit{background-color:#666;color:#bfbfbf}#shang-iframe{background-color:#212121}.jandan-vote{color:#969599}.jandan-vote a.like,.tucao-vote a.like{color:#ce5a47}.jandan-vote a.like:hover,.jandan-vote a.like:visited,.tucao-vote a.like:hover,.tucao-vote a.like:visited{color:red}.jandan-vote a.unlike,.tucao-vote a.unlike{color:#3991b9}.jandan-vote a.tucao-btn:link,tucao-vote a.tucao-btn:link{color:#585954}.jandan-vote a.unlike:hover,.jandan-vote a.unlike:visited,.tucao-vote a.unlike:hover,.tucao-vote a.unlike:visited{color:#00f}.jandan-tucao-more:hover{background-color:#333;color:#bfbfbf}.jandan-tucao-close{color:#727272}.jandan-tucao-close a{color:#969599}.tucao-hot{background-color:#212132}.tucao-hot-title{color:#444;background-color:#323232}.tucao-author,.tucao-author a{color:#969599}.tucao-tip-author{color:#a52619}.tucao-vote,.tucao-vote a,.tucao-vote span{color:#969599}.tucao-vote span.tucao-oo,span.tucao-id{color:#bfbeb2}.tucao-at:hover{color:#333}a.tucao-link,a.tucao-link:link{color:#878787}.tucao-form button{background-color:#545454;border-color:#545454;color:#bfbfbf}.tucao-form input.tucao-email,.tucao-form input.tucao-nickname,.tucao-form textarea{border-color:#323232;background:#333;color:#ccc}#tucao-popup{border-color:#585954;background-color:#212121}.tucao-popup-author{border-bottom-color:#585954}#jandan-msg{background-color:#383838;color:#b4b4b4}';
    GM_addStyle(css);
})();