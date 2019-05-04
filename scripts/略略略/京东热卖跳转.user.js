// ==UserScript==
// @name         京东热卖跳转
// @version      0.3
// @description  re.jd.com自动跳转item.jd.com
// @author       You
// @match        http://re.jd.com/*
// @match        https://re.jd.com/*
// @grant        none
// @run-at document-start
// @namespace https://greasyfork.org/users/49924
// ==/UserScript==

var url = location.href;
var protocol = location.protocol;
if(url.indexOf("/item/") > 0) {
    var index1 = url.indexOf(".html");
    var index2 = url.lastIndexOf("/", index1);
    location.replace(protocol + "//item.jd.com" + url.substring(index2,index1) + ".html");
}

