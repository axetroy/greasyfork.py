// ==UserScript==
// @name         山西农业大学信息学院 教务系统 CISAU
// @version      1.5
// @description  任何浏览器上登陆山西农业大学信息学院教务系统。 环境设计1606朱宇轩 17635388838
// @author       china朱宇轩
// @match       http://jwxt.cisau.com.cn:9090/*
// @match       http://jwxt.cisau.com.cn:9091/*
// @grant        none
// @namespace https://greasyfork.org/users/230858
// ==/UserScript==

(function() {
    'use strict';
    var w = top.topFrame.document.getElementsByTagName("a");
    for(var i = 0;i < 7;i++)
    w[i+1].cIndex = i;
    if (typeof top.bottomFrame.mainFrame.setFlag() == 'function')
      top.bottomFrame.mainFrame.setFlag()
})();