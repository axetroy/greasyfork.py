// ==UserScript==
// @name        bilibili原始播放器
// @namespace   https://greasyfork.org/zh-CN/users/821
// @description 直接用浏览器播放和下载B站原生MP4视频，需要浏览器支持：如firefox、chrome和opera
// @include     http://www.bilibili.com/video/av*
// @version     3.0
// @author      gfork
// @grant       none
// @run-at      document-end
// ==/UserScript==

//    var state=1;
    $('#bofqi').bind("click",function(){
		var url=$('.player-box>video>source').attr("src");
		if(url.length>0){	
            if(confirm("使用原始播放器吗？")){
            window.location=url;}
        else{
		$('#bofqi').unbind();
        }}
	  });