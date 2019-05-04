// ==UserScript==
// @name         广城选修德尚智慧课堂视频可拖动脚本
// @namespace    undefined
// @version      0.0.3
// @description  德尚智慧课堂观看视频可以拖动跳过，快速解决选修问题，请别拖太快以免不算课时。
// @author       ghost
// @match        http://gcp.deshang365.com/student/listen.html*
// @run-at       document-end
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
//启动时做一次修改
window.onload=action;
//绑定事件以自动修改
var a=document.querySelector('li');
a.onclick=function(){
	action();
}
function action()
{
	var v=document.getElementById('video_player');
    //等待页面加载完毕
    if (v==null)
        setTimeout(function(){action();},1000);
    else
    {
        var child=v.childNodes[0];
        var s=child.outerHTML;
        v.innerHTML=s.replace("canDrag=0","canDrag=1");
    }
}