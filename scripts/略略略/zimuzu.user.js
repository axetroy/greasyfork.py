// ==UserScript==
// @name         zimuzu
// @version      0.2
// @description  在片名后添加老下载页面链接!
// @author       You
// @match        http://www.zimuzu.tv/*
// @match        https://www.zimuzu.tv/*
// @match        http://www.zimuzu.io/*
// @match        https://www.zimuzu.io/*
// @grant        none

// @namespace https://greasyfork.org/users/49924
// ==/UserScript==

$(function() {
    $("#play_status").append("<a style='color:red;' href='"+location.href.replace("/resource/","/resource/list/")+"'>----下载----</a>");
});



