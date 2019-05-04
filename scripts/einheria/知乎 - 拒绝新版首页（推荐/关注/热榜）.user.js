// ==UserScript==
// @name 知乎 - 拒绝新版首页（推荐/关注/热榜）
// @description 如题
// @namespace   ModifyNewHomepage@Zhihu
// @version 0.5
// @author einheria
// @match *://www.zhihu.com
// @match *://www.zhihu.com/follow
// ==/UserScript==

//参考了aviraxp的做法：https://www.zhihu.com/question/295161863/answer/493960443

(function() {
    var src = location.href.split("/");
    if(src[2] =="www.zhihu.com" && !src[3]){
        var toSrc = "https://www.zhihu.com/follow";
        location.href = toSrc;
    }
	document.getElementsByTagName('ul')[1].style.display = 'none';
	document.getElementsByClassName('PageHeader')[0].remove();
    setInterval(function(){
        document.getElementsByClassName('Sticky AppHeader is-fixed is-hidden')[0].className = "Sticky AppHeader is-fixed"
    },100);
})(window);