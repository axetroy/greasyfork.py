// ==UserScript==
// @name        tieba.time_gift.click
// @namespace   clumsyman
// @description 自动点击在线时间奖励
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/p?*
// @include     http://tieba.baidu.com/f/*
// @include     http://tieba.baidu.com/f?*
// @version     1
// ==/UserScript==

var name = "在线时间奖励";
var unit = "条";
var selector = "a.time_gift.unopen_gift";

function detect() {
    var nodes = document.querySelectorAll(selector);
    if (nodes) {
        switch(nodes.length) {
            case 0:
                console.log("未能在页面上找到"+name);
                break;
            case 1:
                console.log("自动点击找到的1"+unit+name+"……");
                nodes[0].click();
                break;
            default:
				var error = "在页面上找到"+nodes.length+unit+name+"。";
                console.error(error);
                alert(error);
                break;
        }
    }
}

detect();
var container = document.querySelector('.time_keeper');
var observer = new MutationObserver(detect);
observer.observe(container, { childList: true, subtree: true });
