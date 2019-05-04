// ==UserScript==
// @name         Mac斗鱼播放器
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  用Mac斗鱼打开直播间
// @author       Garyon
// @match        *://*.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    function openMacVideo() {
        try {
            var count = 0;
            var sin = setInterval(() => {
                var title_a = document.querySelector(".Title-report");
                var ooo = document.querySelector('.PhoneWatch-qrcodeTitle');
                if (title_a && ooo) {
                    console.log(title_a);
                    var roomid = /\d+/.exec(title_a.href)[0];
                    ooo.innerHTML='<li><span id="openMacPlayer"><a href = "dy://room/'+roomid+'">Mac斗鱼</span></li>';
                    clearInterval(sin);
                }
                if (count > 50) {clearInterval(sin);} else {count++; }
            }, 100);}
        catch(error){
            console.error(error);
        }
    }
    window.onload = openMacVideo;
})();