// ==UserScript==
// @name         [niconico video] Adds a botton that add mylist to search result
// @name:ja      [ニコニコ動画] 検索結果からマイリスト追加するボタンを追加
// @description  Adds a button that add mylist to search result
// @description:ja 検索結果からマイリストするボタンを追加
// @namespace    masshiro.wpblog.jp
// @version      0.21
// @author       masshiro
// @match        http://www.nicovideo.jp/search/*
// @match        https://www.nicovideo.jp/search/*
// @match        http://www.nicovideo.jp/tag/*
// @match        https://www.nicovideo.jp/tag/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    var span = document.createElement('span');
    span.className = 'value';
    span.style='color:#F00;text-decoration:underline;cursor:pointer';
    span.innerHTML='追加';

    var li = document.createElement('li');
    li.appendChild(span);
    li.className = 'count';

    li.addEventListener('click',function () {
        window.open('http://www.nicovideo.jp/mylist_add/video/' + encodeURIComponent(document.querySelectorAll('li[data-video-item]')[0].getAttribute('data-video-id')), 'nicomylistadd', 'width=500, height=400, menubar=no, scrollbars=no');
    },false);

    Array.prototype.forEach.call(document.querySelectorAll('li[data-video-item] div.itemContent div.itemData ul.list'), function(item,i) {
        var lis = li.cloneNode(true);
        lis.addEventListener('click',function () {
            window.open('http://www.nicovideo.jp/mylist_add/video/' + encodeURIComponent(document.querySelectorAll('li[data-video-item]')[i].getAttribute('data-video-id')), 'nicomylistadd', 'width=500, height=400, menubar=no, scrollbars=no');
        },false);
        item.appendChild(lis);
    });

    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        Array.prototype.forEach.call(evt.target.querySelectorAll('li[data-video-item] div.itemContent div.itemData ul.list'), function(item,i) {
            var lis = li.cloneNode(true);
            lis.addEventListener('click', function () {
                window.open('http://www.nicovideo.jp/mylist_add/video/' + encodeURIComponent(evt.target.querySelectorAll('li[data-video-item]')[i].getAttribute('data-video-id')), 'nicomylistadd', 'width=500, height=400, menubar=no, scrollbars=no');
            },false);
            item.appendChild(lis);
        });
    }, false);
})();