// ==UserScript==
// @name	zhihu脚本
// @author	上帝未满18岁
// @version	0.3
// @description	zhihu脚本,知乎图片加载
// @homepageURL	http://demo.com
// @match	*://*.zhihu.com/*
// @include	*.zhihu.com/*
// @require http://libs.baidu.com/jquery/1.11.1/jquery.min.js
// @namespace https://greasyfork.org/users/11027
// ==/UserScript==


$('.zu-main-content-inner img').each(function () {
    var $this = $(this);
    if (typeof  $this.attr('data-actualsrc') !== 'undefined') {
        $this.attr('src', $this.attr('data-actualsrc'));
    }
});