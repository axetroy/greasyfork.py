// ==UserScript==
// @name         河北工业大学教务处 chrome兼容
// @version      0.1.3
// @description  在chorme上登陆河北工业大学教务处网站
// @author       You
// @match        http://115.24.160.162/*
// @grant        none
// @namespace https://greasyfork.org/users/87620
// ==/UserScript==

(function() {
    'use strict';
    var w = top.topFrame.document.getElementsByTagName("a");
    for(var i = 0;i < 7;i++)
    w[i+1].cIndex = i;
    if (typeof top.bottomFrame.mainFrame.setFlag() == 'function')
      top.bottomFrame.mainFrame.setFlag()
})();