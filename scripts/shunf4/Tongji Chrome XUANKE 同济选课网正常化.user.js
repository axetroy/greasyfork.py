// ==UserScript==
// @name Tongji Chrome XUANKE 同济选课网正常化
// @namespace http://tampermonkey.net/
// @version 0.2
// @description 使同济大学的选课网 xuanke.tongji.com 在 Chrome 内核的浏览器下正常运行
// @author fs
// @match http://xuanke.tongji.edu.cn/*
// @grant none
// @run-at document-start
 
// ==/UserScript==
//无需输验证码，直接点登陆即可提交
window.onload=function(){
    navigator.family="gecko";
    document.getElementsByName("T3")[0].value="不用输了，直接点提交";
    f_submit=function(){document.getElementsByName("T3")[0].value="";document.form1.submit();return false; };
    /*if(window.topFramey){
        window.frames.detailfrm.document.body.onload=function(){window.frames.detailfrm.document.body.oncontextmenu=null;alert(window.frames.detailfrm.document.body.oncontextmenu);};
        window.frames.topFramey.document.body.onload=function(){window.frames.topFramey.document.body.oncontextmenu=null;alert(window.frames.detailfrm.document.body.oncontextmenu);};
        alert(window.topFramey);
    }*/
};

//骗过选课网脚本的浏览器检测，使其将浏览器检测为gecko，解决登陆选课网后左侧目录结构无法展开收起的问题
window.controllers=1;
Object.defineProperty(Object.getPrototypeOf(navigator),'appVersion',{get:function(){return '4.0 (Windows NT) AppleWebKit (KHTML, like Gecko) Chrome Safari';}});

//解决浏览器自动访问favicon.ico造成403自动登出的问题
ico=document.createElement("link");
ico.setAttribute("rel","shortcut icon");
ico.setAttribute("type","image/x-icon");
ico.setAttribute("href","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
document.head.appendChild(ico);
