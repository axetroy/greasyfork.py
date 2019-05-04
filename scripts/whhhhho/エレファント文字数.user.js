// ==UserScript==
// @name         エレファント文字数
// @namespace    エレファント
// @version      0.2
// @description  エレファント速報の文字数を表示
// @match        http://elephant.2chblog.jp/archives/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $arr = $('div.article >dd >span');
    if ($arr.length === 0) {
        $arr = $('div.article dd >b');
    }

    var sum = 0;
    for (var i=0, len=$arr.length; i<len; ++i) {
        sum += $arr[i].textContent.replace(/\s+/g,'').length;
    };

    var ele = $(`<li>${sum.toString()} 字</li>`);
    $('div.article >ul > li.iComment').after(ele);

})();