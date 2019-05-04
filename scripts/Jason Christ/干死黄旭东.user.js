// ==UserScript==
// @name         干死黄旭东
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  斗鱼我的关注第一个永远是黄旭东
// @author       jason19659
// @match        https://www.douyu.com/directory/myFollow
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';
    var list = $("#live-list-contentbox")
    var insert = false;
    function ins() {
        list.unbind("DOMNodeInserted", ins);
        if (!insert) {
            insert = true
            list.prepend("<li class='' data-cid='4' data-rid='3484' data-sid='126' data-is-on='1' data-rpos='0' data-sub_rt='0'><a class='follow-list-all' data-channelid='' data-rid='3484' data-tid='4' href='/scboy' data-ison='1' target='_blank'><span class='imgbox'><b></b><i class='icon-live'>正在直播</i><i class='black'></i><i class='icon_quiz'></i><img class='JS_listthumb thumb' data-original='https://rpic.douyucdn.cn/asrpic/180929/3484_1920.jpg/dy1' src='https://rpic.douyucdn.cn/asrpic/180929/3484_1920.jpg/dy1' width='283' height='163' style='display: block;'></span><div class='mes'><div class='mes-tit'><h3 class='ellipsis' title='干死黄旭东'>干死黄旭东</h3><span class='tag ellipsis'>同卵双狗</span></div><p><span class='dy-name ellipsis fl'>scboy</span><span class='dy-num fr '>99亿</span></p></div></a></li>")

        }

    }
    list.bind("DOMNodeInserted", (ins))

})();