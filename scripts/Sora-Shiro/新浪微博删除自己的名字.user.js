// ==UserScript==
// @name         新浪微博删除自己的名字
// @namespace    undefined
// @version      0.1.1
// @description  强迫症，不想刷微博的时候被舍友偶然瞄到自己的ID，你还可以去掉注释把右侧的显示详细关注人的列表也删掉
// @author       Sora Shiro
// @match        http://www.weibo.com/*
// @match        https://www.weibo.com/*
// @match        http://weibo.com/*
// @match        https://weibo.com/*
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_setClipboard

window.onload=deleteMessage;

$(document).ready(function(){
  deleteMessage();
});

$(window).scroll(function(event){
  deleteMessage();
});

function deleteMessage() {
  var name = $('*[nm="name"]').find('em.S_txt1');
    name.remove();
    var name2 = $('a.name.S_txt1');
    name2.remove();
    //var listOfGroups = $('div#v6_pl_rightmod_groups');
    //listOfGroups.remove();
}