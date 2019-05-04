// ==UserScript==
// @name         熊猫侧边栏/聊天框
// @version      0.7
// @description  try to take over the world!
// @author       You
// @match        http://www.panda.tv/*
// @match        https://www.panda.tv/*
// @match        http://xingyan.panda.tv/*
// @match        https://xingyan.panda.tv/*
// @grant        none
// @run-at       document-end

// @namespace https://greasyfork.org/users/49924
// ==/UserScript==

var $ = $ || window.$;
var url = window.location.href;

if(!isNaN(url.substring(url.lastIndexOf("/")+1, url.indexOf("?") == -1 ? url.length : url.indexOf("?")))){
    setTimeout(function(){SidebarCollapsed(true);},500);
    $(window).resize(function() {
        setTimeout(function(){SidebarCollapsed(false);},500);
    });
}

function SidebarCollapsed(pageLoad) {
    var side = $("#room_matrix").length ? $("#room_matrix").find(".psbar__toggle") : $(".sidebar-state-toggle-btn");
    var chat = $(".room-chat-texta");

    if(side.length == 1 && chat.length == 1) {
        if($("#room_matrix").hasClass("open-state") || ($(".sidebar-container-next").length && !$(".sidebar-container-next").hasClass("sidebar-collapsed"))) {
            side.click();
        }

        if(pageLoad){
            chat.keyup(function(e){
                if(e.keyCode == "27"){
                    this.focus();
                }
            });
        }
    }
    else if(side.length > 1 || chat.length > 1) {
        console.log("................");
    }
    else if(side.length == 0 || chat.length == 0) {
        setTimeout(function(){SidebarCollapsed(true);},500);

    }
}