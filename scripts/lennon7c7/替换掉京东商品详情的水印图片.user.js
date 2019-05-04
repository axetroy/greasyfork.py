// ==UserScript==
// @name         替换掉京东商品详情的水印图片
// @namespace    https://www.jd.com
// @version      1.0
// @description  因为大图有水印，所以显示成没有水印的图片
// @author       Lennon
// @match        *item.jd.com/*
// @run-at       document-end
// @icon         https://www.jd.com/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    $('.zoomImg').live('hover', function() {
        var element = $('.zoomImg');
        var element_src = element.attr('src');
        var replace_string_old = '/n0/';
        var replace_string_new = '/n12/';
        if (element_src && element_src.includes('/n0/')) {
            element.attr('src', element_src.replace(replace_string_old, replace_string_new));
        }
    });
})();