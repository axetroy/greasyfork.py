// ==UserScript==
// @name         天使动漫右下角广告去除
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       You
// @match        http://s-dm.com/*
// @grant        none
// ==/UserScript==
/*因我不喜欢页面有浮动广告，所以整了这个脚本，因为这个脚本是在网页加载完后运行，多少会有卡顿，如有大佬想另加修改，请随意！还请大家多资瓷一下天使站点*/
(function() {
    'use strict';
    var x=document.getElementById("close");
    var f=x.parentNode;
    var a=f.parentNode;
    a.removeChild(f);
    // Your code here...
})();