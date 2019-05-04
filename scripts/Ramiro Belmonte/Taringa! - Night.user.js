// ==UserScript==
// @name       Taringa! - Night
// @version    0.1
// @description  estilo nocturno
// @match      http://www.taringa.net/mi
// @include    http*://www.taringa.net/mi
// @copyright  @ramirobelmonte6
// @namespace  http://www.taringa.net/ramirobelmonte6
// @icon       http://o1.t26.net/images/favicon.ico
// ==/UserScript==

(function() {
    var estilo = $('<style type="text/css" id="taringadark">'+
        '.reg-ct p, .reg-ct h2, .reg-ct label, div#footer-links>ul>li>a, nav.tabs ul li a, div.meta-data ul li a, .activity-element, .activity-content p, .button-action-s .action-number, .list .list-element, .box div.title h2 {color: #fff;}'+
        '.reg-ct, .reg-sb, #main, .last-action, div#footer-links>ul, .v6-beta .v6-content, .shout-box, .box, .activity-element, .list .list-element, #friends-live-activity .list-item{background-color:#263238;}'+
        'div#Feed-controls-mi ul li:hover {background: aliceblue;}'+
        'div#Feed-controls-mi {background: #fff;border: none;border-radius: 0;box-shadow: none;box-sizing: border-box;margin: 0 0 10px 0;width: auto;}'+
        '.textrank-tags ul li:hover{background:none;}'+
        '#friends-live-activity .list-item{border-top: solid 1px #323c42;}'+
        '.reg-ct .form-item, .reg-wr .divider a:before, .reg-wr .divider a:after, .reg-wr .divider h3.secondary-divider{background:none;}'+
        '.user-actions{background:none;}'+
        'a{color:#FF5722;}'+
        '.btn.g:hover {color: #464646;background: #8c8c8c;}'+
        '.small-list.activity-log .list-element{border:none;}'+
        '.form-input-text:active, .form-input-text:focus {border: none;background: rgba(255, 255, 255, 0.73);}'+
        '.box.clearfix {padding: 3px 2px 3px 2px;}'+
        '.box div.title,.divider {background: #22282b;border-bottom: none;padding: 4px;}'+
        '.activity-element a {color: #0670c3;}'+
        '.box div.title h2, .box .title .action{background:none;}'+
        'a.Feed-load.first.overflow-ellipsis {text-shadow: none;color: #fff;}'+
        'a:focus, a:hover {color: #86b8d0;text-decoration: underline;}'+
        '.btn.g {color: #fff;background: #636363;}'+
        '.activity-element a {color: #FF5722;}'+
        '.button-action-s {background: none !important;border-left: none;}'+
        '.header-main, .shout-footer, .quick-reply, .list-element:nth-child(2n+1){background:#22282b !important;border:none !important;}'+
        '.user-actions .user-action>a[class^="ico"] .count{padding:3px; border-radius:50px !important;}'+
        '.activity-header .s-action-list{right: -18px;top: -3px;}'+
        '#friends-live-activity {height: 300px;   width: auto;}'+
        '.dialog, .user-actions .user-action>a[class^="ico"] .count:before, .user-actions .user-action>a[class^="ico"] .count:after{display:none;}'+
        '.quick-reply textarea {width: 75% !important;background: rgba(158, 158, 158, 0.46);border: none;}'+
        '.small-list.activity-log, .small-list.quick-reply{max-width:100% !important;}'+
        '.small-list.activity-log,.small-list.quick-reply {margin: 0;width: auto;max-width: 100%;border:0;}'+
        '.activity-content {border: none;border-radius: 0;padding: 0 15px !important;width: 543px;background: none;}'+
        '.activity-element a.alter {;border: none;padding: 1px;border-radius:15%;}'+
        '.activity-element a.avatar img,.shout-box a.avatar img, .list-item img,.activity-element a.alter>img, .perfil-avatar img {;border: none;box-shadow: none; border-radius:15%;}'+
        '.activity-element a.avatar img:hover, .shout-box a.avatar img:hover{   border:none;box-shadow:none;}'+
        '.activity-element a.avatar img:hover,.shout-box a.avatar img:hover .activity-element a.avatar img,.shout-box a.avatar img, .min-avatar {border: none;box-shadow: none;}'+
        '.activity-element a.avatar {margin: 0;}'+
        '.activity-element {margin-bottom: 10px;}'+
        '.activity-element.activity-min.clearfix{background: white;border:none;padding:6px 5px 6px 5px;margin-left:auto;margin-right:auto;}'+
        '.activity-element.clearfix .activity-content{width:578px;}'+
        '.activity-element.mention .activity-content {background:none !important;}'+
        '.activity-element.unread .activity-content,.activity-element.unread .shout-footer {border: none;}'+
        '.activity-element.unread .activity-content{border: none;border-radius: 0;padding: 0 15px;}'+
        '.activity-element.video iframe {width: 100% !important;height: 420px !important;}'+
        '.activity-element{ padding: 8px 8px 2px 8px;}'+
        '.v6-beta .v6-content{border:none !important;}'+
        '.header-main__item.drop-panels:after{border-top-color:#fff;}'+
        '.v6-beta.section-mi>#page{background:none;}'+
        '.v6-beta.section-mi>#page>#main{background:none;background-image:none;border: none;}'+
        '.v6-beta.section-perfil>#page>#main{background:none;background-image:none;border: none;}'+
        '.v6-beta.section-comunidad>#page>#main{background:none;background-image:none;border: none;}'+
        '.my-shout-textarea-wall textarea, .my-shout-textarea-mi textarea, .my-shout-textarea-perfil textarea, .my-shout-textarea-wall textarea, #my-shout-body-wall{width:85%;}'+
        '.shout-box {margin: 10px 0 10px 0;}'+
        '.shout-footer {background: #fff;background-image: none;border-left: none;border-right: none;border-bottom: none;border-top: 1px solid silver;border-radius: 0;box-shadow: none;float: left;margin-left: 0 !important;margin-top: 8px;width: 100%;}'+
        '.shout-live .shout-actions .shout-stats{background:none !important}'+
        '.shout-live .shout-head,.shout-live .shout-body,.shout-live .shout-actions{border-bottom:none;}'+
        '.shout-live-box {left: 525px;border-radius: 0;}'+
        '.shout-live-container .shout-arrow{background: url("https://k61.kn3.net/0/9/0/2/E/2/2D4.png") no-repeat;background-size:contain;}'+
        '.shout-live{border-radius:0;}'+
        '.shout-spinner, #Feed-loading span{ background: url("https://k60.kn3.net/taringa/2/6/9/9/0/6/01/ramirobelmonte6/EE7.gif") no-repeat center;height: 25px; width: auto; min-height: 30px;  margin: 0 auto; background-size: contain;}'+
        '.activity-element.clearfix .activity-content{width:560px;}'+
        '</style>');
$('head').append(estilo);
})();
$('.box.community-ads').remove();
$('.dialog').remove();