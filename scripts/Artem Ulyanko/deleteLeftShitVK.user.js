// ==UserScript==
// @name deleteLeftShitVK
// @description Удаляет рекламу вк
// @author Kopatych
// @license MIT
// @version 1.0
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include https://vk.com/*
// @namespace https://greasyfork.org/users/13597
// ==/UserScript==
(function (window, undefined) {
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }
    if (/https:\/\/vk.com/.test(w.location.href)) {
        $(document).ready(function(){$('#left_blocks').remove(); $('#left_ads').remove()});
{$('#left_blocks').remove(); $('#left_ads').remove()}}, 1200);
    }
})(window);

