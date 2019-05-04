// ==UserScript==
// @name         社会主义核心价值观 - 时刻提醒
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  中国共产党社会主义核心价值观 时时刻刻在你访问的每个页面飘出并提示！
// @author       kj863257
// @include         http://*
// @include			https://*
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    jQuery(document).ready(function($) {
        var a_idx = 0;
        var e = {pageX:-10, pageY:-10};
        $("body").mousemove(function(ele) {
            e = ele;
        });
        setInterval(function(){
            var a = new Array("\u5bcc\u5f3a", "\u6c11\u4e3b", "\u6587\u660e", "\u548c\u8c10", "\u81ea\u7531", "\u5e73\u7b49", "\u516c\u6b63" ,"\u6cd5\u6cbb", "\u7231\u56fd", "\u656c\u4e1a", "\u8bda\u4fe1", "\u53cb\u5584");
            var $i = $("<span/>").text(a[a_idx]);
            a_idx = (a_idx + 1) % a.length;
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                "pointer-events":'none',
                "z-index": 99999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-weight": "bold",
                "color": "#c40000",
                "text-shadow":"0 0 3px white"
            });
            $("body").append($i);
            $i.animate({
                "top": y - 180,
                "opacity": 0
            },
                       1500,
                       function() {
                $i.remove();
            });
        }, 1000);
    });
})();