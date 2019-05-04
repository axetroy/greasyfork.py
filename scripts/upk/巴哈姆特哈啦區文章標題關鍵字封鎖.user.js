// ==UserScript==
// @id             巴哈姆特哈啦區文章標題關鍵字封鎖
// @name           巴哈姆特哈啦區文章標題關鍵字封鎖
// @version        20180419
// @namespace      巴哈姆特哈啦區文章標題關鍵字封鎖
// @author         johnny860726
// @description    在巴哈姆特哈啦區瀏覽文章時自動忽略標題含有特定關鍵字的討論串
// @include        *forum.gamer.com.tw/B.php*
// @run-at         document-end
// ==/UserScript==

var keyword = ["寶拉", "polla", "安價", "KFC姊姊", "KFC姐姐", "太后姐姐", "太后姊姊"];
var elems = document.getElementsByClassName("b-list__main__title");
var i, j;

for(i=0; i<elems.length; i++){
    for(j=0; j<keyword.length; j++){
        if(elems[i].innerText.search(keyword[j]) !== -1){
            elems[i].innerText = "本討論串已無文章";
            elems[i].setAttribute("class", "b-list__main__title is-del");
            elems[i].removeAttribute("href");
            break;
        }
    }
}