// ==UserScript==
// @name         巴哈姆特之隨時隨地使用哈哈姆特
// @description  巴哈全站都可開啟哈哈姆特，不限於B頁。
// @namespace    nathan60107
// @version      1.7
// @author       nathan60107(貝果)
// @contributor  moontai0724(我是月太 づ(・ω・)づ)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      https://*.gamer.com.tw/*
// @exclude      https://forum.gamer.com.tw/A.php*
// @exclude      https://forum.gamer.com.tw/B.php*
// @exclude      https://forum.gamer.com.tw/C.php*
// @exclude      https://ani.gamer.com.tw/*
// @exclude      https://haha.gamer.com.tw/*
// @exclude      https://prj.gamer.com.tw/*
// @exclude      https://home.gamer.com.tw/friendList.php?user=*
// ==/UserScript==

function create(){//創建哈哈姆特
    if( typeof(BAHA_IM)!= 'undefined' && typeof(BAHA_IM_LAYOUT) != 'undefined' && typeof(firebase.firestore) != 'undefined') {
        jQuery('body').ready( function() {
            console.log("載入哈哈姆特...");
            im = new BAHA_IM('fixed',{token:''});
            im_layout = new BAHA_IM_LAYOUT();
        });
    }else{
        setTimeout(function(){create();}, 500);
    }
}

function init2(){//firebase-firestore.js需等待firebase.js讀入之後才能讀取
    if( typeof(firebase) != 'undefined' ) {
        jQuery("head").append('<script src="https://www.gstatic.com/firebasejs/4.12.0/firebase-firestore.js">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/plugins/async.min.js?v=1512036516" type="text/javascript">');

        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/im_layout_lib.js?v=1535616831" type="text/javascript">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/im_data_forum.js?v=1535616831" type="text/javascript">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/im_layout_forum.js?v=1536571197" type="text/javascript">');

        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/im_data.js?v=1536571197" type="text/javascript">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/im_layout_fix.js?v=1539683868" type="text/javascript">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/im_data_sleep.js?v=1535616831" type="text/javascript">');
        create();
    }else{
        setTimeout(function(){init2();}, 500);
    }
}

function init(){//取得哈哈姆特必要的js檔和css檔
    if(typeof(tippy) == 'undefined'){
        jQuery("head").append('<link href="https://i2.bahamut.com.tw/css/plugins/tippy-1.4.0.css?v=1508309674" rel="stylesheet" type="text/css">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/plugins/tippy-1.4.0.min.js?v=1508309663" type="text/javascript">');
    }
    if(typeof(slick) == 'undefined'){
        jQuery("head").append('<link href="https://i2.bahamut.com.tw/css/plugins/slick.css?v=1495087872" rel="stylesheet" type="text/css">');
        jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/plugins/slick-1.6.0.min.js?v=1495088259" type="text/javascript">');
    }

    jQuery("head").append('<link rel="stylesheet" type="text/css" href="https://i2.bahamut.com.tw/css/plugins/toastr.min.css?v=1498617831">');
    jQuery("head").append('<link href="https://i2.bahamut.com.tw/css/im_all-site-message.css" rel="stylesheet" type="text/css">');
    jQuery("head").append('<link href="https://i2.bahamut.com.tw/css/im_all-site-message-utils.css" rel="stylesheet" type="text/css">');

    jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/plugins/lightbox.js?v=1493864417" type="text/javascript">');
    jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/plugins/toastr-2.1.3.min.js?v=1498617831" type="text/javascript">');
    jQuery("head").append('<script src="https://i2.bahamut.com.tw/js/jquery/jquery.md5.js?v=1507198213" type="text/javascript">');

    jQuery("head").append('<script src="https://www.gstatic.com/firebasejs/4.12.0/firebase.js">');
    init2();
}

init();
