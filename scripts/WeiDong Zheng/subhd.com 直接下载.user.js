// ==UserScript==
// @name         subhd.com 直接下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  直接下载subhd.com的字幕
// @author       sarices
// @match        http://subhd.com/a/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $.post('/ajax/down_ajax',{sub_id:$("#down").attr("sid")},function(data){
        console.log(data.url);
        var html = '<a href="'+data.url+'" style="color:red;">直接下载</a> ';
        $('#down').before(html);
        $('#down').remove();
    },'json');
})();