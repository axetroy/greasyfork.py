// ==UserScript==
// @name         小朱影视搜索
// @namespace    http://noad.zhuchaoli.club/
// @version      1.3
// @description  可以在豆瓣电影，时光电影和预告片世界的网页里的电影标题旁添加搜索按钮！
// @author       zhuguli
// @grant        GM_addStyle
// @match        *://movie.douban.com/subject/*
// @match        *yugaopian.cn/movie/*
// @match        *://movie.mtime.com/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("@charset utf-8;#mtimeSearchBtn{margin-left: 5px;padding:5px 10px;font-size:25px;color:#fff;background: #127bab;}#mtimeSearchBtn:hover{text-decoration: none;}#mtimeSearchBtn2{margin-left: 5px;padding:5px 10px;font-size:25px;color:#fff;background: #127bab;}#mtimeSearchBtn2:hover{text-decoration: none;}#yugaopianSearchBtn{margin-left:5px;letter-spacing:1px;padding:5px 10px;line-height:27px;font-family: '微软雅黑','黑体';background: #7cd37c;color:#fff;font-size:14px;}#yugaopianSearchBtn:hover{background: #57c857;}#yugaopianSearchBtn2{margin-left:5px;letter-spacing:1px;padding:5px 10px;line-height:27px;font-family: '微软雅黑','黑体';background: #7cd37c;color:#fff;font-size:14px;}#yugaopianSearchBtn2:hover{background: #57c857;}#doubanSearchBtn{border-radius:2px;letter-spacing:1px;color:#ca6445;font-weight:normal;background: #fae9da;font-size:16px;padding:5px 10px;line-height:28px;}#doubanSearchBtn:hover{color: #d9896a;background: #fcefe3;}#doubanSearchBtn2{border-radius:2px;letter-spacing:1px;color:#ca6445;font-weight:normal;background: #fae9da;font-size:16px;padding:5px 10px;line-height:28px;}#doubanSearchBtn2:hover{color: #d9896a;background: #fcefe3;}");
    var reDouban = /douban/i;
    var reYugaopian = /yugaopian/i;
    var reMtime = /mtime/i;
    var curUrl = window.location.href;
    var curWords = '';
    function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    var dbSearchBtn = '<a id="doubanSearchBtn" target="_blank">全网搜索</a>';
    
    var ygpSearchBtn = '<a id="yugaopianSearchBtn" target="_blank">全网搜索</a>';
    
    var mtSearchBtn = '<a id="mtimeSearchBtn" target="_blank">全网搜索</a>';
   
    if(reDouban.test(curUrl)){
        var doubanTitle = $('#content').find('h1');
        doubanTitle.append(dbSearchBtn);
       	curWords = trim($('title').text().split('(')[0]);
        $('#doubanSearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
        
    }
    if(reYugaopian.test(curUrl)){
        $('.movie-name').css('float','left').after(ygpSearchBtn);
       	curWords = trim($('.movie-name').attr('title'));
        $('#yugaopianSearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
	
    }
    if(reMtime.test(curUrl)){
    	if($('.db_head').length>0){
	   var curMtitle = $('.db_head').find('h1');
	   curMtitle.next('p').after(mtSearchBtn);
	   curWords = trim(curMtitle.text());
	   $('#mtimeSearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
	   
    	}
    }
})();