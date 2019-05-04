// ==UserScript==
// @name			yyt2Html5
// @namespace		yyt2Html5.yinyuetai.com
// @author			ZWB
// @description		音悦台自动跳转Html5播放
// @include			http://v.yinyuetai.com/video/*
// @include			http://v.yinyuetai.com/playlist/*
// @exclude			http://v.yinyuetai.com/video/h5/*
// @exclude			http://v.yinyuetai.com/playlist/h5/*
// @version			2018.12.24
// @encoding		utf-8
// @icon		   http://www.yinyuetai.com/favicon.ico
// @run-at			document-start
// ==/UserScript==
"use strict";
(function (){
    var yyth5=window.location.pathname.split("/");
    if ( yyth5[2] != "h5" ){
        window.location.href="/"+yyth5[1]+"/h5/"+yyth5[2];
    }else {
        console.log("未知错误!");
    }
})();