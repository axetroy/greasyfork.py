// ==UserScript==
// @name         显示闲鱼搜索框
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  找回 阿里巴巴 闲鱼网 隐藏 的搜索框
// @author       dingtian
// @match        *://*.2.taobao.com/*
// @match        *://s.ershou.taobao.com/*
// @grant        MIT License
// ==/UserScript==

(function () {
    'use strict';

    const idleSearch = document.createElement("div");
    idleSearch.className = "idle-search";
    const form = document.createElement("form");
    form.setAttribute("action", "//s.2.taobao.com/list/list.htm");
    form.setAttribute("name", "search");
    form.setAttribute("target", "_top");
    const inputSearch = document.createElement("input");
    inputSearch.setAttribute("class", "input-search");
    inputSearch.setAttribute("id", "J_HeaderSearchQuery");
    inputSearch.setAttribute("name", "q");
    inputSearch.setAttribute("type", "text");
    inputSearch.setAttribute("placeholder", "搜闲鱼");
    const button = document.createElement("button");
    button.setAttribute("class", "btn-search");
    button.setAttribute("type", "submit");
    const i = document.createElement("i");
    i.innerHTML = "&#xe602;";
    i.setAttribute("class", "iconfont");
    const span = document.createElement("span");
    span.setAttribute("class", "search-img");

    button.appendChild(i);
    button.appendChild(span);
    form.appendChild(inputSearch);
    form.appendChild(button);
    idleSearch.appendChild(form);

    const idleHeader = document.getElementsByClassName("idle-header")[0];
    idleHeader.appendChild(idleSearch);

    //屏蔽闲鱼app引导下载二维码
    var mauGuide = document.getElementsByClassName("mau-guide")[0];

    if (mauGuide) {
        mauGuide.setAttribute("style", "display:none");
        console.log("ok1");
    }
    delQrcode();
    var downloadLayer
    function delQrcode() {
        setTimeout(
            function () {
                downloadLayer = document.getElementsByClassName("download-layer")[0];
                if (downloadLayer) {
                    downloadLayer.setAttribute("style", "display:none");
                    console.log("ok2");
                }
                else {
                    delQrcode();
                }
            }, 500
        );
    }
})();