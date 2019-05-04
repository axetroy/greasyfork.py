// ==UserScript==
// @name        acfun地址替换
// @namespace   https://greasyfork.org/users/29338
// @description   把ac土豆替换回http://www.acfun.tv/
// @include     http://acfun.tudou.com/*
// @version     1
// @grant       none
// ==/UserScript==
search=location.href.split("/")[3];
ac=location.href.split("/")[4];
if (ac.split("",2)[1]=="c" || search.split("",2)[1]=="e")
 location.href="http://www.acfun.tv/" + location.href.split("/")[3] + "/" + location.href.split("/")[4];
