// ==UserScript==
// @name         巴哈姆特之隨時隨地使用樓層電梯
// @description  在Co頁(單一樓層文章)也能使用樓層電梯，不限於C頁。
// @namespace    nathan60107
// @version      1.0
// @author       nathan60107(貝果)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      https://forum.gamer.com.tw/Co.php?*
// ==/UserScript==

Forum.C.elevator = function(a, i, n) {//改寫電梯function使得Co頁也能使用
    if (a = a || window.event, 13 == a.keyCode) {
        var o = parseInt((a.target || a.srcElement).value, 10);
        if (!isNaN(o)){
            var c = window.location;
            c.href = "https://" + c.host + "/C.php" + "?bsn=" + i + "&snA=" + n + "&to=" + o
        }
    }
}

//啟用被隱藏的電梯相關界面
var obj = document.getElementsByClassName("jumpfloor");
obj[0].style.display = "";