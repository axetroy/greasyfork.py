// ==UserScript==
// @name         色影无忌论坛图片自适应显示大图
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  xitek forum view photos as large as possible
// @author       joshatt
// @match        http://forum.xitek.com/thread*.html
// @grant        none
// ==/UserScript==

(function() {
var allphotos=document.getElementById('nv_forum');
var visiblehigh=document.documentElement.clientHeight-5;
var right_wide=document.querySelector('td.plc').offsetWidth-70;
allphotos.innerHTML=allphotos.innerHTML.replace(/width\:\s*640px|max-width\:\s*640px/g,"max-height:"+visiblehigh.toString()+"px;max-width:"+right_wide+"px");
})();