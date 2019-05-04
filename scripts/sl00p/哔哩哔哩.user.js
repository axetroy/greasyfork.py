// ==UserScript==
// @name         哔哩哔哩
// @namespace    http://tampermonkey.net/
// @version      0.3.3
// @description  去除手机版 6 分钟限制，添加网页跳转
// @author       sl00p
// @match        https://m.bilibili.com/video/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var data;
    var host = "https://comment.bilibili.com/recommendnew,";
    var aid = /\d+/g.exec(document.location.href)[0];
    console.log("start parse....");
    function FackWechat() {
        if(window.localStorage && window.localStorage.getItem("window.bsource") != "wechat") {
            window.localStorage.setItem("window.bsource", "wechat");
        }
        if(document.cookie.indexOf("wechat") == -1) {
            document.cookie = "bsource=wechat";
        }
        console.log("cookie ==> ", document.cookie);
    }
    console.log("window.bsource ==> ", window.localStorage.getItem("window.bsource"));
    function HttpGet(url,success){
        var xmlhttp = null;
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.open("GET",url,true);
        xmlhttp.timeout = 4000;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 504 ) {
                    console.log("服务器请求超时..");
                    xmlhttp.abort();
                }else if(xmlhttp.status == 200){
                    success(xmlhttp.responseText);
                }
                xmlhttp = null;
            }
        }
        xmlhttp.ontimeout = function () {
            console.log("客户端请求超时..");
        }
        xmlhttp.send();
    }
    FackWechat();
    HttpGet(host + aid, function(res) {
        data = JSON.parse(res).data;
        var nodesInterval = setInterval(function() {
            var nodes = document.getElementsByClassName("index__title__src-videoPage-related2Col-videoItem-");
            if (nodes !== undefined) {
                for(var i = 0; i < nodes.length; ++i) {
                    console.log("parse node " + i + " ...");
                    nodes[i].innerHTML="<p><a href=\"av" + data[i].aid + ".html\">" + data[i].title + "</a></p>";
                    clearInterval(nodesInterval);
                };
            }
        }, 1000);
        var appInterval = setInterval(function() {
            var nodeList = ["index__openAppBtn__src-commonComponent-topArea-", "index__svgaOpenAppBtn__src-videoPage-svgaOpenAppBtn-", "index__downLoadBtn__src-videoPage-commentArea-"];
            var app = document.getElementsByClassName("index__openApp__src-videoPage-related2Col-videoItem-");
            if (app !== undefined) {
                app.onclick = function() { return false };
                for(var i = 0; i < app.length; ++i) {
                    app[i].innerText = data[i].owner.name;
                }
                for(var j = 0; j < nodeList.length; ++j) {
                    if(document.getElementsByClassName(nodeList[j]).length > 0) {
                        document.getElementsByClassName(nodeList[j])[0].remove();
                    }
                }
                clearInterval(appInterval);
            }
        }, 1000);
    });
})();