// ==UserScript==
// @name        EFVideoDownloader
// @author      rjw
// @description 显示视频下载链接
// @namespace   com.uestc.rjw
// @icon        https://raw.githubusercontent.com/babyrjw/StaticFiles/master/logo-icon.jpg
// @license     Apache Licence V2
// @encoding    utf-8
// @date        20/08/2015
// @modified    20/08/2015
// @include     http://center.ef.com.cn/*
// @include     http://www.englishtown.cn/community/*
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// @run-at      document-end
// @version     1.0.5
// ==/UserScript==


/*
 * === 说明 ===
 *@作者:rjw
 *@Email:babyrjw@163.com
 * */
var indexOfCenter = location.href.indexOf('://center.ef.com.cn');
var indexOfCom = location.href.indexOf('://www.englishtown.cn/community/');
var html_script = '\
	var alink = function(){\
        console.log(document);\
        var player = document.getElementById("jp_video_0");\
		if(player != undefined){\
			var url = player.getAttribute("src");\
            console.log(url);\
            if(url == null){\
               setTimeout(alink,1000);\
            }else{\
               console.log(player);\
			   console.log(url);\
			   var content = document.getElementById("main-panel-1");\
			   var a = document.createElement("a");\
			   a.text = "***Click To Download***";\
			   a.href = url;\
			   a.target = "_Blank";\
			   content.appendChild(a);\
            }\
		}\
    };\
    setTimeout(alink,0);';
document.addEventListener("DOMNodeInserted",function(event){
    if(event.srcElement.id == "jp_video_0"){
        console.log(event);
        var script = document.createElement("script");
        script.text= html_script;
        document.body.appendChild(script);
    }
},false);