// ==UserScript==
// @name         ニコ生HTML5プレイヤーで放送が止まる現象の回避
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adblockを使っているとニコ生の放送が固まる現象を回避
// @author       とげとげ
// @match        http://live2.nicovideo.jp/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

$(window.onload = function(){
    setTimeout(function(){
        $(".___reload-button___abF8m").click();
        //$("[ aria-label = '映像・音声が止まった際に押して下さい' ]").click();
    },300);
})(jQuery);