// ==UserScript==
// @name         巴哈-插入圖片-無限捲動
// @namespace    hbl917070
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=hbl917070
// @version      0.2
// @description  開啟「插入圖片」的視窗後，不用點「更多圖片」，就會自動一直冒出新的圖片
// @author       hbl917070
// @include      https://forum.gamer.com.tw/C.php?bsn*
// @include      https://forum.gamer.com.tw/Co.php?bsn*
// @include      https://forum.gamer.com.tw/post1.php?bsn*
// @grant        none
// ==/UserScript==


/**
 * 說明：
 * 開啟「插入圖片」的視窗後，不用點最下面的「更多圖片」，就會自動一直冒出新的圖片
 * https://forum.gamer.com.tw/C.php?bsn=60076&snA=4761161
 * 
 * 更新資訊
 * 2019-03-26：改為自動不斷載入更多圖片
 * 
 */

(function () {


    function func_取得更多小屋圖片() {

        if (document.getElementsByClassName("uploadimage-home").length > 0) {
            document.getElementsByClassName("uploadimage-home__btn")[0].click(); //取得更多圖片
        }

        setTimeout(function () {
            func_取得更多小屋圖片();
        }, 800);
    }

    func_取得更多小屋圖片();


  


})();
