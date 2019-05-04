// ==UserScript==
// @name         起点小说阅读页面跳转wwwploy旧版
// @namespace    http://tampermonkey.net/
// @version        0.3
// @description  try to take over the world!
// @author       ufa31415
// @match        http://*.qidian.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
var l=location.toString();
var q="";
if(l.indexOf("http://read.")>=0){
q=l.split("http://read.")[1].split("&")[0];
}
if(q!="")
{
  location.href="http://wwwploy."+q;
}
