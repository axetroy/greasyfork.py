// ==UserScript==
// @name         MidiShow免登录下载
// @namespace     http://TouHou.DieMoe.net/
// @version      0.2
// @description  免会员免积分直接下载midi文件。
// @author       DieMoe
// @run-at       document-idle
// @match        *://www.midishow.com/midi/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var downurl;
    if($("[name=src]").attr("value")){
        downurl=$("[name=src]").attr("value");
    }else{
        downurl=$("#wm_player").attr("data");
    }
    $("#options").html("<li><a target='_blank' href='"+downurl+"'>免登录下载</a></li>"+$("#options").html());
})();