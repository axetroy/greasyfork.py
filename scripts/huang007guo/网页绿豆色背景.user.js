// ==UserScript==
// @name       网页绿豆色背景
// @namespace  hank
// @version    0.3
// @description  绿豆色背景
// @match      http://*/*
// @include http://*/*
// @include https://*/*
// @author       Hank
// @copyright  2018+, Hank
// @require       https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
(function (){
	var body = document.getElementsByTagName('body').item(0);
    //var backCss = {"background-color":'rgb(204, 232, 207)'};
    var backCss = {"background-color":'rgb(206, 234, 186)'};
   	body.style.background = 'rgb(206, 234, 186)';
    //body.style.opacity = "0.4";
    //百度百科
    if(location.hostname.indexOf("baike.baidu") === 0){
        $('.content').css(backCss);
    }
    //腾讯新闻
    if(location.hostname.indexOf(".qq.com") >= 0){
       $('.wrapper .main').css(backCss);
    }
    console.log('%c 这里是背景绿豆色js', 'background: rgb(206, 234, 186); color: #000', $);
})();