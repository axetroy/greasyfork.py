// ==UserScript==
// @name       Taringa! - Flat Design
// @version    0.8
// @description  estilo-flat
// @match      http://www.taringa.net/*
// @include    http*://www.taringa.net/*
// @copyright  @ramirobelmonte6
// @namespace  http://www.taringa.net/ramirobelmonte6
// @icon       http://o1.t26.net/images/favicon.ico
// ==/UserScript==

(function() {
    var estilo = $('<style type="text/css" id="taringaflat">'+
    '#asd input:hover, #asd input:focus{border-right:2px solid #40CDE6 !important}'+
    '#asd input{border:none; border-right:2px solid #CCC !important; border-radius:0px;}'+
    '#comm-thread-list .thread{background:#fff;}'+
    '#comm-thread-list{margin-top:10px;}'+
    '#comments, #comments-featured, #comments-linked{width:100%;}'+
    '#comunidad-container #sidebar .fixme{display:block;}'+
    '#comunity-data-stats>.floatL.profile{width:auto;}'+
    '#feed-alert-container .alert {border: none;border-radius: 0;color: #fff;margin: 0 0 10px 0;text-shadow: none;}'+
    '#feed-alert-container{margin: 0;}'+
    '#footer .wrapper{padding-bottom:0px; background:none;}'+
    '#friends-live-activity {height: 300px;   width: auto;}'+
    '#full-col>.box>.title.clearfix>h2{padding: 4px;}'+
    '#full-col>.box>.title.clearfix{background:#fff;border-bottom:0;margin-bottom:10px;}'+
    '#full-col>.box{background:none;padding:0;}'+
    '#main {background:#fff;background-image:none;border: none;}'+
    '#main-col #full-col{width:100%; padding:0;}'+
    '#main-col #left-col{padding:10px 0 0 0;}'+
    '#main-col .box {background: none !important;padding: 0;margin: 0;}'+
    '#main-col{width:690px;}'+
    '#newPost #sidebar{width:280px}'+
    '#print-mensaje{background:#fff; margin-bottom:10px;}'+
    '#sidebar .highlight-data {width: auto;max-width: 255px;min-width: 221px;}'+
    '#sidebar .photo_small img {width: 94px;height: 94px;margin-left:4px;}'+
    '#sidebar .photo_small{margin:1px;}'+
    '#sidebar{padding:10px 0 0 0;}'+
    '#tool-shout{top: 49px;}'+
    '.action-select span{color:#ADADAD;}'+
    '.action-select:hover span{color:#004F92;}'+
    '.activity-content {border: none;border-radius: 0;padding: 0 15px !important;width: 543px;background: none;}'+
    '.activity-element a.alter {background: #fff;border: none;padding: 1px;border-radius:15%;}'+
    '.activity-element a.avatar img,.shout-box a.avatar img, .list-item img,.activity-element a.alter>img, .perfil-avatar img {background: #fff;border: none;box-shadow: none; border-radius:15%;}'+
    '.activity-element a.avatar img:hover, .shout-box a.avatar img:hover{   border:none;box-shadow:none;}'+
    '.activity-element a.avatar img:hover,.shout-box a.avatar img:hover .activity-element a.avatar img,.shout-box a.avatar img, .min-avatar {border: none;box-shadow: none;}'+
    '.activity-element a.avatar {margin: 0;}'+
    '.activity-element {background: #fff;margin-bottom: 10px;}'+
    '.activity-element.activity-min.clearfix{background: white;border:none;padding:6px 5px 6px 5px;margin-left:auto;margin-right:auto;}'+
    '.activity-element.clearfix .activity-content{width:578px;}'+
    '.activity-element.mention .activity-content {background:none !important;}'+
    '.activity-element.unread .activity-content,.activity-element.unread .shout-footer {border: none;}'+
    '.activity-element.unread .activity-content{border: none;border-radius: 0;padding: 0 15px;}'+
    '.activity-element.video iframe {width: 100% !important;height: 420px !important;}'+
    '.activity-element{ padding: 8px 8px 2px 8px;}'+
    '.activity-header .s-action-list {right: -31px;top: -2px;}'+
    '.activity-min{margin-left:0;}'+
    '.alert.danger,.alert.error {background-color: #ff5722;}'+
    '.alert.info {background-color: #2196f3;}'+
    '.author .profile{width:auto;}'+
    '.bar-menu{background:#fff;}'+
    '.box .read-more span a {color: #FFF;background:#079D48;padding: 1px 5px;border-radius: 5px;}'+
    '.box .read-more{background:#fff !important}'+
    '.box div.title,.divider {background: #fff;border-bottom: none;padding: 4px;}'+
    '.box {background: #fff;padding: 3px 8px 8px; margin-bottom:10px;}'+
    '.box.comustat ul.action-data li{border:none;}'+
    '.box.w-medallas ul.clearfix {margin-top: 4px;}'+
    '.box> a> img{width:100%;}'+
    '.breadcrump{margin-top:10px;}'+
    '.button-action-s {background: none !important;border-left: none;}'+
    '.comment-data, .fastreply-data{width:auto;}'+
    '.comment:hover{background:#fff;}'+
    '.comment{background:#fff;}'+
    '.cont-filterH ul li a span {background: rgb(0, 93, 171);border-radius: 15px;box-shadow: none;text-shadow: none;}'+
    '.cont-filterH ul li a {height: 30px;padding: 14px 20px 0;}'+
    '.cont-filterH ul li a.active {background: rgb(232, 82, 82);border-radius: 0;box-shadow: none;text-shadow: none;}'+
    '.cont-filterH ul li {height: auto;}'+
    '.cont-filterH{margin:10px 0 10px 0; width:auto;}'+
    '.content-left{margin-right:420px;}'+
    '.content-right{width:400px}'+
    '.denunciar{background: url("dflag.gif") no-repeat scroll center rgb(255, 255, 255);margin:0;padding:8px;}'+
    '.dialog {display: none;}'+
    '.fixme .box{width: auto !important;}'+
    '.fixme {display: none; width:300px !important;}'+
    '.fl-l>li>a[href$="/juegos"]{display:none;}'+
    '.floatL.profile{width:120px;}'+
    '.header-main .nav-principal li {color: #fff;}'+
    '.header-main {border: none;}'+
    '.image .activity-content img{max-width:100%;}'+
    '.info-tema .btn{top:0;}'+
    '.last-action{border:none;}'+
    '.link-summary {border-left: 5px solid #8A8A8A;margin: 15px 0 0;padding: 15px;border-radius: 0;box-sizing: content-box;}'+
    '.list .list-element--post{padding:5px 10px}'+
    '.mis-comunidades .resultBox{background:#fff;}'+
    '.my-shout-textarea-wall textarea, .my-shout-textarea-mi textarea, .my-shout-textarea-perfil textarea, .my-shout-textarea-wall textarea, #my-shout-body-wall{width:85%;}'+
    '.myComment.clearfix.v6{background:#fff;}'+
    '.nav-pages{background:#fff;}'+
    '.nav-user {padding-top: 7px;}'+
    '.nav-user__s-input {border: 0;color: #005DAB;text-indent: -999em;font-size: 16px;font-weight: normal;background: none;transition: all 300ms cubic-bezier(0.22, 0.61, 0.36, 1);}'+
    '.nav-user__s-input {transition: all 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);}'+
    '.nav-user__search .br-2 {border-radius: 0;height: auto;}'+
    '.nav-user__search{;border-radius:0 !important;border:none;background:#fff;}'+
    '.nav-user__search{height:44px;}'+
    '.nav-user__search{margin:0;}'+
    '.nav-user__shout {padding: 12px 11px !important;line-height: 0;}'+
    '.notification-detail span.time{right:6px;}'+
    '.perfil-content.general {background: none;padding: 0;}'+
    '.perfil-data {padding: 10px;border-bottom: none;position: relative;background:#fff;}'+
    '.perfil-user{padding: 0;border-bottom: none;position: relative;background:#fff;}'+
    '.private-messages .breadcrump{padding:10px 0 15px 10px;}'+
    '.quick-reply textarea {width: 76.4% !important;}'+
    '.quick-reply {background: none;}'+
    '.reg-ct{background:#263238;}'+
    '.section-post .meta-data .breadcrump, .section-comunidad .meta-data .breadcrump{padding: 0;}'+
    '.shout-box {margin: 10px 0 10px 0;}'+
    '.shout-footer {background: #fff;background-image: none;border-left: none;border-right: none;border-bottom: none;border-top: 1px solid silver;border-radius: 0;box-shadow: none;float: left;margin-left: 0 !important;margin-top: 8px;width: 100%;}'+
    '.shout-live .shout-actions .shout-stats{background:none !important}'+
    '.shout-live .shout-head,.shout-live .shout-body,.shout-live .shout-actions{border-bottom:none;}'+
    '.shout-live-box {left: 525px;border-radius: 0;}'+
    '.shout-live-container .shout-arrow{    background: url("https://k61.kn3.net/0/9/0/2/E/2/2D4.png") no-repeat;background-size:contain;}'+
    '.shout-live{border-radius:0;}'+
    '.shout-spinner, #Feed-loading span{ background: url(https://k60.kn3.net/taringa/2/6/9/9/0/6/01/ramirobelmonte6/EE7.gif) no-repeat center;height: 25px; width: auto; min-height: 30px;  margin: 0 auto; background-size: contain;}'+
    '.sidebar{width:327px;}'+
    '.small-list.activity-log, .small-list.quick-reply{max-width:100% !important;}'+
    '.small-list.activity-log,.small-list.quick-reply {margin: 0;width: auto;max-width: 100%;border:0;border-left: 3px solid #E34C4C;}'+
    '.tema-footer>a{line-height:1;}'+
    '.tools .mas {background: rgb(241, 241, 241);}'+
    '.tools li a {background: #fff;}'+
    '.tools {background: rgb(241, 241, 241);}'+
    '.tools#tool-profile li a {background: #fff;}'+
    '.tools#tool-profile li a:hover {color: #005DAB;}'+
    '.tools#tool-profile li a:hover{color: #EFEFEF !important;}'+
    '.tools#tool-profile {border: none;}'+
    '.tools:before {border-bottom-color: #868993;}'+
    '.ubertext-counter-shout-footer{right:15%;}'+
    '.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default{line-height:2.2;}'+
    '.user-action>#tool-profile>ul>li>a {background: #004987;}'+
    '.user-actions .user-action .user-name {max-width: 100px;}'+
    '.user-actions .user-action .user-name:hover {color: silver;}'+
    '.user-actions .user-action>a {color: #005DAB;padding: 0 4px;}'+
    '.user-actions .user-action>a[class^="ico"] .count {left: 3px;bottom: 2px;line-height: 5px;border-radius: 50%;z-index: 100;width: auto;height: auto;padding: 6px;}'+
    '.user-actions .user-action>a[class^="ico"] .count:after {display: none;}'+
    '.user-actions .user-action>a[class^="ico"] .count:before {display: none;}'+
    '.user-actions .user-action>a[class^="ico"]:hover {color: silver;}'+
    '.user-actions img.user-picture {border-radius: 15%;}'+
    '.user-actions {background: #fff;border-radius: 0;color: #005DAB;padding: 2px; margin:0 12px 0 0;}'+
    '.user-level ul li {float: left;padding: 10px 6px;width: 75px;border-right: 1px solid #E6E6E6;border-bottom:none;border-top:none;text-align: center;line-height: 15px;background: rgb(255, 255, 255);}'+
    '.user-level{float:none;}'+
    'input.ui-corner-all.form-input-text.box-shadow-soft.floatL {width: 66% !important;}'+
    '.v6 .btn, .ui-corner-all{border-radius: 0 !important;padding: 12px;}'+
    '.v6 .btn- none{border-radius:0 !important;}'+
    '.v6-beta .v6-content,.section-home nav.tabs{max-width:none; border:none !important; background:#004F92;}'+
    '.v6-beta nav.tabs li.active a{background:none !important;}'+
    '.v6-beta.section-comunidad>#page>#main{background:none;background-image:none;border: none;}'+
    '.v6-beta.section-mi>#page>#main{background:none;background-image:none;border: none;}'+
    '.v6-beta.section-mi>#page{background:none;}'+
    '.v6-beta.section-perfil>#page>#main{background:none;background-image:none;border: none;}'+
    '.v6-container{max-width:none;}'+
    '#user-metadata-profile > ul.clearfix {border-top: 1px solid #e6e6e6;}'+
    '.v6-content{border-right:0; margin-right:323px;}'+
    '.vcard{margin:10px 0 10px;}'+
    '.widget.big-info.clearfix.box>ul>li{background:#fff}'+
    '.widget.box.clearfix {padding: 3px 2px 3px 2px;}'+
    '::-webkit-scrollbar-thumb{background:#908E8E;}'+
    '::-webkit-scrollbar-track{background:#E5E5E5;}'+
    '::-webkit-scrollbar{width:16px;background:#fff;}'+
    'a.siguiente-listado.floatR {padding: 3px 13px;background: #C8C8C8;}'+
    'article.comment-replies-container{background:#fff;}'+
    'body#pagusuario{background:#fff}'+
    'body{font-family:Fixedsys;}'+
    'button.nav-user__s-submit.icon-buscador.btn--noui.m-0.p-0.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only{color:#005DAB !important;}'+
    'div#comments-content{background:#fff}'+
    'div#comments{width:100%}'+
    'div#Feed-controls-mi ul li:hover {background: aliceblue;}'+
    'div#Feed-controls-mi {background: #fff;border: none;border-radius: 0;box-shadow: none;box-sizing: border-box;margin: 0 0 10px 0;width: auto;}'+
    'div#footer{margin-top:10px;}'+
    'div.stats{width:142px;}'+
    'form[name="mensaje"] {background: white;}'+
    'img.avatar-48{border-radius:15%;}'+
    'nav.tabs .crear-post, div.meta-data .crear-post{position: relative;right: 0;margin-right: 0;padding: 0 25px;line-height: 35px;margin: 0;height: 38px;border-radius: 0 !important;}'+
    'nav.tabs ul li a, div.meta-data ul li a{color:#A8D8FF;}'+
    'nav.tabs ul li.active a, div.meta-data ul li.active a {background: none; border-bottom:none; font-weight: normal; border-bottom: 2px solid;color: #A8D8FF !important;}'+
    'ol.breadcrump.clearfix{padding:10px;}'+
    'ol.breadcrump.fl-l.clearfix{margin:0;}'+
    'section#comments{width:auto;}'+
    'ul.footer-list:first-child{margin:0; border-top:1px solid #A5A5A5}'+
    '</style>');
    $('head').append(estilo);
})();
$('.box.community-ads').remove();
$('.dialog').remove();
$('.tools#tool-profile:before').remove();