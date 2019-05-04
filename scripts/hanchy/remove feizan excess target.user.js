// ==UserScript==
// @name        remove feizan excess target
// @description 去除飞赞【查看更多动态】时出现的多余的新建标签页
// @namespace   feizai.com
// @include     http://www.feizan.com*
// @version     1.0
// @author     hanchy
// @grant       none
// ==/UserScript==

feedLink=document.getElementById("feed_a_more");
if(feedLink){
    feedLink.removeAttribute("target");
}