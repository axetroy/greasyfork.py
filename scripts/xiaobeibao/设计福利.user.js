// ==UserScript==
// @name         设计福利
// @namespace    DesignShare
// @version      1.2.1
// @description  目前支持虎课网，视达网
// @author       Q群：551794580
// @match        *://huke88.com/course/*
// @match        *://shida66.com/*.html*
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==


(function () {
	'use strict';
	init();
})();

function getAddress(type){
    var goto = confirm("由于油猴权限限制，无法直接播放\n是否跳转至独立网页版使用\n\nQQ交流群号：551794580");
    if(goto){
        if(type){
            window.location.href = 'https://www.xuesheji.me/index/index/quick/token/E3B68521448DF072/by/shida.html';
        }else{
            window.location.href = 'https://www.xuesheji.me/index/index/quick/token/E3B68521448DF072/by/huke.html';
        }
    }
    
}

function init(){
	//虎课
	$('#download-source-js').unbind('click');
	$('#huke88-video').unbind('click');
	$('#download-case-js').unbind('click');
	$('#see-other-content').unbind('click');

	$('#huke88-video').bind('click',function(){
	    getAddress(0);
	});
	//视达
	$('.play-center').unbind('click');
	$('.play-main .left-foot .down-btn').unbind('click');
	$('#look-whole').unbind('click');

	$('.play-center').bind('click',function(){
	    $('.play-center').unbind('click');
	    getAddress(1);
	});

	$('#look-whole').bind('click',function(){
	    $('.max-h-box').removeAttr('style');
	    $('.max-h-box').css('max-height','none');
	    $('#login').hide();
	    $('.open-tips').hide();
	    $('#shida-wins').hide();
	});

}