// ==UserScript==
// @name         处理 Chrome 键盘滚屏
// @namespace    https://www.zhihu.com/people/yin-xiao-bo-11
// @version      0.1
// @description  可访问性优化
// @author       Veg
// @include    *.zhihu.com/question/*/answer/*
// @include    https://zhuanlan.zhihu.com/p/*
// @include    *://jingyan.baidu.com/*
// @include    http://bbs.zol.com.cn/*
// @grant        none
// ==/UserScript==

document.addEventListener("scroll",function (e) {
e.stopPropagation();
},null);
/*
var audio = new Audio("http://veg.ink/music/open.mp3");
audio.volume = 0.7;
audio.play();
*/