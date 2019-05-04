// ==UserScript==
// @name         ZiMuZu旧下载列表恢复
// @version      1.1
// @description  恢复曾经的下载列表
// @author       F1tz
// @match        http://www.zimuzu.tv/resource/*
// @grant        none
// @namespace https://greasyfork.org/users/172241
// ==/UserScript==

(function() {
    'use strict';
    var artId = document.getElementsByClassName('news-bbs')[0].firstElementChild.firstElementChild.nextElementSibling.href.substr(33,5);
    var text = document.createElement('strong');
    text.textContent = "打开下载列表（需登录）";

    var dlLink = document.createElement('a');
    dlLink.setAttribute('href','http://www.zimuzu.tv/resource/list/' + artId);
    dlLink.setAttribute('target','_blank');
    dlLink.setAttribute('class','f3');
    dlLink.appendChild(text);

    var dlElement = document.createElement("h3");
    dlElement.appendChild(dlLink);

    var appendLink = document.getElementsByClassName("tc view-res-tips view-res-nouser")[0];
    appendLink.insertBefore(dlElement,appendLink.firstElementChild);
})();