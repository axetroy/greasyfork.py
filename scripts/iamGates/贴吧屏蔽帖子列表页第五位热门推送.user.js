// ==UserScript==
// @name         贴吧屏蔽帖子列表页第五位热门推送
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  屏蔽百度贴吧帖子列表页除置顶外第五个帖子，一般是热门推送
// @author       iamGates
// @include      /http://tieba\.baidu\.com/.*/
// @exclude      /http://tieba\.baidu\.com/./.*/
// @exclude      http://tieba.baidu.com/
// @license      MIT
// ==/UserScript==

var c = 0;
function r(){
    if(c === 0){
    var obj = document.getElementsByClassName("j_thread_list clearfix").item(document.getElementsByClassName("j_thread_list thread_top clearfix").length + 4);
    obj.parentNode.removeChild(obj);
    c = 1;
    }
    else{
     document.removeEventListener("mousemove",r);
    }
}

document.addEventListener("mousemove", r);



