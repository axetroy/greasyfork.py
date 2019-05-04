// ==UserScript==
// @name         Youtube封面
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sam
// @match        *://www.youtube.com/watch?v=*
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @run-at document-end
// ==/UserScript==
$(document).ready(function(){

    function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
    }

    var title=document.title
    //var url=window.location.href
    var url_no=window.location.search
    var url_image = "https://i.ytimg.com/vi/"+url_no.substr(3,url_no.length)+"/maxresdefault.jpg"
    //console.log("封面地址")
    //console.log(url_image)
    $("#watch8-secondary-actions > div:nth-child(3)").append('<div class="yt-uix-menu yt-uix-videoactionmenu " data-menu-content-id="yt-uix-videoactionmenu-menu"><span class="yt-uix-menu "><a href='+url_image +' download target="_blank">封面</a><style>a{text-decoration:none;}</style></span></div> ')
});