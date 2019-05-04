// ==UserScript==
// @name         【晋江文学城】【晋江论坛】网友交流区 战色逆乐园 标记楼主
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  此脚本会在楼主的名字旁边标注“楼主”字样
// @author       chikan
// @match        http://bbs.jjwxc.net/*

// @grant        none
// ==/UserScript==
function setLzName() {
    var lzName=$('.authorname').eq(0).find('font').eq(2).text();
    $('font').each(function(){
        if($(this).text()==lzName){
            var newNode="<font color='blue'>[楼主]</blue>"
            $(this).after(newNode)
        }
    })
}

$(function(){
    setLzName()
})
