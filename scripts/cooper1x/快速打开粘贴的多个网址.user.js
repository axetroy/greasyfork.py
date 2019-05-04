// ==UserScript==
// @name         快速打开粘贴的多个网址
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Cooper
// @match        *://*/*
// @grant        none
// @run-at       context-menu
// ==/UserScript==


(function () {
    'use strict';

    // Your code here...
    document.body.style.position = "relative";
    var div = document.createElement("div");
    var textarea = document.createElement("textarea");
    var btn = document.createElement("button");
    var close_btn = document.createElement("button");
    var time_input = document.createElement("input");
    textarea.style.cssText = "display:block;width:600px;height:300px";
    btn.innerHTML = "全部跳转！";
    close_btn.innerHTML = "关闭";
    time_input.value = "500";
    time_input.style.width = "40px";
    div.style.cssText = "position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;z-index:99999;width:800px;height:600px;backgroun:red;display:flex;justify-content:center;align-items:center;";
    div.appendChild(textarea);
    div.appendChild(btn);
    div.appendChild(close_btn);
    div.appendChild(time_input);
    document.body.appendChild(div);
    btn.onclick = function () {
        var arr = textarea.value.split("\n");
        for (let i = 0; i < arr.length; i++) {
            setTimeout(() => {
                window.open(arr[i]);
            }, time_input.value);
        }
        document.body.removeChild(div);
    };
    close_btn.onclick = function () {
        document.body.removeChild(div);
    };
})();