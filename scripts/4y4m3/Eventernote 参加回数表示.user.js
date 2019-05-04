// ==UserScript==
// @name         Eventernote 参加回数表示
// @namespace    https://www.eventernote.com/
// @version      0.1
// @description  Eventer Note のお気に入り声優/アーティストにイベント参加回数を表示させる
// @author       4y4m3
// @match        https://www.eventernote.com/*
// @grant        none
// ==/UserScript==

(function() {
    var v=document.getElementsByClassName('gb_actors_list')[0].getElementsByTagName('li');
    for(var i=0;i<v.length;i++)
    {
        var n=v[i].className.replace(/.*c(\d+).*/,'$1');
        v[i].getElementsByTagName('a')[0].textContent+='('+n+')'
    }
})();