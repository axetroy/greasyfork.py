// ==UserScript==
// @name         增加“多标签搜索按钮”
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  增加“多标签搜索按钮”，原帖 http://bangumi.tv/group/topic/344240 ， 作者 windrises（http://bangumi.tv/user/windrises）
// @author       鈴宮華緋
// @include      /https?:\/\/(bgm\.tv|bangumi\.tv|chii\.in).*/
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    let nav_a = $("div.headerNeueInner").find("a.nav");
    for(let i = 0;i < nav_a.length;i++) {
        let matcher = nav_a.eq(i).attr("href").match(/\/(.*)?\/tag/);
        matcher ? nav_a.eq(i).parent().after('<li><a target="_blank" href="http://39.106.63.71/bgmtools/multitag/' + matcher[1] + '" ckass="nav" style="display:block;">多标签搜索</a></li>') : null;
    }
})();