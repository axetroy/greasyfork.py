// ==UserScript==
// @name               mteam adult 新窗口打开
// @author              rachpt
// @version             0.1.2
// @include             https://tp.m-team.cc/adult.php*
// @include             https://tp.m-team.cc/artist.php*
// @exclude            https://tp.m-team.cc/adult.php?id=*
// @description      请在设置中自己添加包含网址
//@namespace      https://greasyfork.org/users/175111
// @icon                  https://tp.m-team.cc/favicon.ico
// @grant                none
// @namespace https://greasyfork.org/users/175111
// ==/UserScript==

if (window.location.pathname == '/artist.php') {
    var aTag_1 = document.querySelectorAll('td#outer a');
    //table.torrents用于限定a标签的范围
    for (var j = aTag_1.length - 1; j> -1; j--) {
        //去除翻页
        if (! aTag_1[j].getAttribute('href').search("page")) {
            aTag_1[j].setAttribute("target", "_blank");
        }
    }
} else {
    var aTag_2 = document.querySelectorAll('table.torrentname a');
    // table.torrents用于限定a标签的范围
    for (var i = aTag_2.length - 1; i > -1; i--) {
        if (aTag_2[i].getAttribute('title')) {
            aTag_2[i].setAttribute("target", "_blank");
        }
    }
}