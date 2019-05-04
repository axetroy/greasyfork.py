// ==UserScript==
// @name         屏蔽linux中国的去广告警告
// @namespace    https://linux.cn
// @version      0.1
// @description  try to take over the world!
// @author       ztcaoll222
// @match        *://linux.cn/*
// ==/UserScript==

(function() {
    var e=document.createElement('div');
    e.id='pleaseRemoveOurSiteFromBlackList';
    e.style.display='none';
    document.body.appendChild(e);
})();
