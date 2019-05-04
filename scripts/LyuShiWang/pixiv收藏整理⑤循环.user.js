// ==UserScript==
// @name         pixiv收藏整理⑤循环
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://www.pixiv.net/bookmark.php?type=illust_all&p=*
// @grant        none
// ==/UserScript==

var li_temp = document.getElementsByClassName('view_mypixiv')[0].childNodes[1];
var href_class = li_temp.getElementsByTagName('a')[0];
var url0 = href_class.href;
window.location.href = url0;
