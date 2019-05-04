// ==UserScript==
// @name         斗鱼H5高清打开
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  通过顶部导航栏H5按钮打开H5播放器    自用~~~~~
// @author       Ruick
// @grant       unsafeWindow
// @run-at      document-start
// @match        *://*.douyu.com/*
// @include     https://*.douyu.com/*
// @grant        none
// ==/UserScript==

var IsOpenURIWhenPageLoadedEnable = false;
document.addEventListener('DOMContentLoaded',OnPageLoaded , true);
//document.onload = OnPageLoaded;
function OnPageLoaded (event) {
    try {
        window.oneerror = function()
        {
            return true;
        };
        var url = window.location.href;
        console.log(url);
        var URI = "";
        var element, element2, para, childpara, node;
        if (url.indexOf("douyu") != -1)
        {
            var rurl = "";
            var links = document.getElementsByTagName("link");
            var link = {};
            for(var i=0;i<links.length;i++){
                link = links[i];
                if(link.rel === "canonical"){
                    rurl = link.href;
                    break;
                }
            }
            if(rurl.length==0)
            {
                URI = "http://192.144.132.74:6688/Live?id=" + url.match("[0-9].*")[0];
            }
            else
            {
                URI = "http://192.144.132.74:6688/Live?id=" + rurl.match("[0-9].*")[0];
            }
            para = document.createElement("li");
            para.setAttribute("class", "fl");
            childpara = document.createElement("a");
            childpara.href = URI;
            node = document.createTextNode("H5");
            childpara.appendChild(node);
            para.appendChild(childpara);
            element = document.getElementsByClassName("head-nav fl")[0];
            try {
                element.appendChild(para);
            } catch (error) {}
        }
        if (URI !== "" && URI !== null && URI !== undefined && IsOpenURIWhenPageLoadedEnable)
        {
            window.location.href = URI;
        }
    }
    catch (error)
    {
        //alert(error);
    }
}

