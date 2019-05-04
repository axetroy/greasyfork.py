// ==UserScript==
// @name         巴哈姆特之勇造介面固定每頁筆數40
// @description  都9102年了怎麼還會有人想用每頁8筆？
// @namespace    nathan60107
// @version      1.0
// @author       nathan60107(貝果)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      https://avatar1.gamer.com.tw/shop.php*
// @include      https://avatar1.gamer.com.tw/wardrobe.php*
// ==/UserScript==

function change(){
    if(document.getElementsByClassName("AR-array")[0]==undefined){
        setTimeout(function(){change();}, 2000);
    }else{
        var AR = document.getElementsByClassName("AR-array");
        if(location.toString().match(`https://avatar1.gamer.com.tw/shop.php.*`)){
            AR[0].children[4].children[0].onclick();
        }else if(location.toString().match(`https://avatar1.gamer.com.tw/wardrobe.php.*`)){
            AR[0].children[3].onclick();
        }
    }
}

(function() {
    'use strict';
    change();
})();