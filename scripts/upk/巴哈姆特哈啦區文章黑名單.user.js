// ==UserScript==
// @name       巴哈姆特哈啦區文章黑名單
// @namespace  巴哈姆特哈啦區文章黑名單
// @author     johnny860726
// @match      *forum.gamer.com.tw/*
// @run-at     document-end
// @version    20180422
// @description 令瀏覽器自動隱藏特定帳號在巴哈姆特發表的文章或討論串
// ==/UserScript==

// 封鎖對象, 請自行用逗號分隔
var blt = 'abuse004,abuse005,abuse006';

var blt_a = blt.toLowerCase().split(',');
var elems, i, j, obj;
try{
    elems = document.querySelectorAll('.c-post__header__author > .userid');
    for(i=0; i<elems.length; i++){
        for(j=0; j<blt_a.length; j++){
            if(elems[i].innerText.toLowerCase() === blt_a[j]){
                elems[i].parentNode.parentNode.parentNode.parentNode.style = "display: none;";
            }
        }
    }
}catch(err){
    alert(err);
}

try{
    elems = document.querySelectorAll('.b-list__count > .b-list__count__user > a');
    for(i=0; i<elems.length; i++){
        for(j=0; j<blt_a.length; j++){
            if(elems[i].innerText.toLowerCase() === blt_a[j]){
                obj = elems[i].parentNode.parentNode.parentNode.querySelector('.b-list__main__title')
                obj.innerText = "本討論串已封鎖";
                obj.setAttribute("class", "b-list__main__title is-del");
                obj.removeAttribute("href");
                break;
            }
        }
    }
}catch(err){
}