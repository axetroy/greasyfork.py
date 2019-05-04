// ==UserScript==
// @name         Macapp下载助手
// @namespace    http://nobelliu.github.io/
// @version      0.3
// @description  为 macapp.so 增加一个下载按钮
// @author       NobelLiu
// @match        http://www.macapp.so/*/
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==
'use strict';
$(setTimeout(function () {
        if (document.getElementById("code")) {
            var download = document.getElementsByClassName("download")[0];
            var codeElement = document.getElementById("code");
            var dlButton = document.createElement('a');
            var code = document.body.innerHTML.match(/document.getElementById\("code"\).innerHTML="\w\w\w\w/).toString().match(/\w\w\w\w$/);
            dlButton.innerHTML = code;
            var href = "/go" + window.location.pathname + "#" +code;
            dlButton.setAttribute("href", href);
            dlButton.setAttribute("target", "_blank");
            dlButton.style.cssText = "color:gray;background-color:white;width:40px;height:24px;padding:2px 8px;border:1px solid #ccc;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius:5px;";
            download.insertBefore(dlButton, codeElement);
            codeElement.removeAttribute("id")
        }
    }
    , 100));
