// ==UserScript==
// @name         宽屏Metrics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://metrics.sankuai.com/mobile/*
// @grant        none
// ==/UserScript==
/*! highlight.js v9.12.0 | BSD3 License | git.io/hljslicense */
(function() {
    'use strict';
    function findElement(selector, callback) {
        var el = document.querySelectorAll(selector);
        if (el.length > 0) {
            el.length == 1 ? callback(el[0]) : callback(el);
        } else {
            setTimeout(function() {
                findElement(selector, callback);
            }, 300);
        }
    }
    findElement('div.container', function(el) {
        el.style.width = '100%';
    });
    findElement('.hertz-select-item', function(ss) {
        for (var i = 0, len = ss.length; i < len; i++) {
            if (ss[i].querySelector('.hertz-select-title').textContent == '页面') {
                ss[i].querySelector('.ant-select-selection').style.width = '900px';
                break;
            }
        }
    });
})();