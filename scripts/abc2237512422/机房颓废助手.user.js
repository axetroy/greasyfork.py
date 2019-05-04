// ==UserScript==
// @name         机房颓废助手
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  使用一个网页来伪装另一个网页并快速切换（点击网页左下角的悬浮按钮开始伪装）
// @author       abc2237512422
// @match        http://*/*
// @match        https://*/*

// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    if (self!=top){//检测是否在Iframe中
        return;
    }
    var fakeIframe=document.createElement("iframe");
    fakeIframe.id="fakeIframe";
    document.body.appendChild(fakeIframe);
    var displayToggler=document.createElement("div");
    displayToggler.id="displayToggler";
    displayToggler.innerText="颓";
    document.body.appendChild(displayToggler);
    var css=document.createElement("style");
    css.innerHTML="#displayToggler{opacity:0.05;user-select:none;transition: all 0.1s;position:fixed;left:6px;bottom:6px;border:none;font-size:16px;width:36px;height:36px;display:block;z-index:9999999999999999;border-radius:100px;color:#fff;background:#5e72e4;box-shadow:0 4px 6px rgba(50,50,93,.11);text-align:center;line-height:35px;}";
    css.innerHTML+="#displayToggler:hover{opacity: 0.9;}";
    css.innerHTML+="#fakeIframe{display:none;background:#fff;width:100%;height:100%;border:none;margin:0;padding:0;position:fixed;left:0;top:0;bottom:0px;right:0;z-index:9999999999999995;}";
    css.innerHTML+=".unscrollable,.unscrollable *{overflow: hidden !important;}";
    document.body.appendChild(css);

    displayToggler=document.getElementById("displayToggler");
    fakeIframe=document.getElementById("fakeIframe");
    displayToggler.onclick=function (){
        var tar=displayToggler.getAttribute("tar");
        if (tar==undefined||tar==""||tar=="null"){
            displayToggler.setAttribute("tar",window.prompt("请输入要颓废的网址。（鼠标移到页面左下角时，透明的页面切换按钮会显现，点击来切换伪装网页(如洛谷)和颓废网页(如Slay)。标签栏的标题和图标将保持不变。）","slay.one"));
            tar=displayToggler.getAttribute("tar");
            if (tar==undefined||tar==""||tar=="null"){
                return;
            }
            if (tar.toLowerCase().indexOf("http://")==-1&&tar.toLowerCase().indexOf("https://")==-1){
                tar=document.location.protocol+"//"+tar;
            }
            displayToggler.setAttribute("tar",tar);
            fakeIframe.setAttribute("src",tar);
        }
        var isFaking=fakeIframe.getAttribute("isFaking");
        if (isFaking==undefined||isFaking==""||isFaking=="false"){
            fakeIframe.style="display:block;";
            fakeIframe.setAttribute("isFaking","true");
            document.getElementsByTagName("html")[0].classList.add("unscrollable");
        }else{
            fakeIframe.style="width:1px;height:1px;display:block;opacity:0;left:-1px;top:-1px;";
            fakeIframe.setAttribute("isFaking","false");
            document.getElementsByTagName("html")[0].classList.remove("unscrollable");
        }
    };
    displayToggler.oncontextmenu=function(){
        event.returnValue=false;
    };
    displayToggler.onmousedown=function(ev){
        if (event.button!=1){
            return;
        }
        document.getElementsByTagName("html")[0].classList.add("unscrollable");
        displayToggler.style.transition="all 0s";
        displayToggler.style.opacity="1";
        var x1=ev.clientX;
        var y1=ev.clientY;
        var l=displayToggler.offsetLeft;
        var t=displayToggler.offsetTop;
        var lastonmousemove=document.onmousemove;
        document.onmousemove=function(ev){
            var x2=ev.clientX;
            var y2=ev.clientY;
            var x=x2-x1;
            var y= y2-y1;
            var lt=y+t;
            var ls=x+l;
            displayToggler.style.bottom=document.documentElement.clientHeight-lt-36+'px';
            displayToggler.style.left=ls+'px';
        }
        var lastonmouseup=document.onmouseup;
        document.onmouseup=function(ev){
            displayToggler.style.transition="";
            displayToggler.style.opacity="";
            document.onmousemove=lastonmousemove;
            document.onmouseup=lastonmouseup;
            document.getElementsByTagName("html")[0].classList.remove("unscrollable");
        }
    }
})();