// ==UserScript==
// @name         ニコニ広告を割りこませない
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  検索結果に割りこんでくるニコニ広告を隠すだけ
// @author       You
// @match        http://www.nicovideo.jp/search/*
// @match        http://www.nicovideo.jp/tag/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement("style")
    style.innerHTML = `
.contentBody .nicoadVideoItem {
display:none;
}
`;
    document.body.appendChild(style)
})();