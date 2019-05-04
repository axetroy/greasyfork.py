// ==UserScript==
// @name         Hide owend
// @namespace    https://greasyfork.org/en/users/120519-benzinadaze
// @version      v1.30
// @description  隐藏比价站已经拥有的
// @author       Benz1
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @match        *://steamkeys.ovh/
// @match        *://www.steamkeys.ovh/*
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle(".btnowned{width:130px;height:40px;font-size:20px}");

const btn = document.createElement('button');
    btn.innerHTML = "HideOwned";
	btn.id = "Hide";
	btn.className = "btnowned";
    btn.title = "隐藏已经拥有的游戏（等待页面加载完全或者多按几次）";

$("head").before(btn);   

$("#Hide").on("click",function(){
    let owned = document.querySelectorAll ("span[style='color: green !important; cursor: help;']");
    if (location.pathname == '/table.php'){
        for (let i = 0;i < owned.length;i++) {
            owned[i].parentNode.parentNode.remove();
        }
    }else{
        for (let i = 0;i < owned.length;i++) {
            owned[i].parentNode.parentNode.parentNode.remove();
        }
    }
});