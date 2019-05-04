// ==UserScript==
// @name				wikipeida 繁体中文跳简体中文
// @version				0.1
// @author				LisonFan
// @match				https://zh.wikipedia.org/wiki/*
// @match				https://zh.wikipedia.org/zh/*
// @match				https://zh.wikipedia.org/zh-hk/*
// @match				https://zh.wikipedia.org/zh-mo/*
// @match				https://zh.wikipedia.org/zh-tw/*
// @match				https://zh.wikipedia.org/zh-sg/*
// @grant				none
// @icon				https://zh.wikipedia.org/static/favicon/wikipedia.ico
// @namespace 			https://lisonfan.com/
// @description https://zh.wikipedia.org/zh/* to https://zh.wikipedia.org/zh-cn/*
// ==/UserScript==

(function() {
    'use strict';
	var href = location.href;
    
    var changeHref;
    
    if (href.indexOf("/wiki/") > 0){
        changeHref = href.replace(/\/wiki\//g, "/zh-cn/");
    }else if (href.indexOf("/zh/")  > 0){
        changeHref = href.replace(/\/zh\//g, "/zh-cn/");
    }else if (href.indexOf("/zh-hk/")  > 0){
        changeHref = href.replace(/\/zh-hk\//g, "/zh-cn/");
    }else if (href.indexOf("/zh-mo/")  > 0){
        changeHref = href.replace(/\/zh-mo\//g, "/zh-cn/");
    }else if (href.indexOf("/zh-sg/")  > 0){
        changeHref = href.replace(/\/zh-sg\//g, "/zh-cn/");
    }else if (href.indexOf("/zh-tw/")  > 0){
        changeHref = href.replace(/\/zh-tw\//g, "/zh-cn/");
    }
    location.href = changeHref;
})();