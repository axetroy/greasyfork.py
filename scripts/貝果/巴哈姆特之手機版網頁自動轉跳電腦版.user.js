// ==UserScript==
// @name         巴哈姆特之手機版網頁自動轉跳電腦版
// @description  自動切換成電腦版，省去手動切換的麻煩。
// @namespace    nathan60107
// @version      1.0
// @author       nathan60107(貝果)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      *//m.gamer.com.tw*
// @grant        none
// ==/UserScript==

(function() {
    var target = document.getElementsByClassName("gtm-nav-backpc");
    if(target != null){
        var dest = target[0].href;
        window.location.href = dest;
    }
})();