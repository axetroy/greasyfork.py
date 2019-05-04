// ==UserScript==
// @name         屏蔽种子磁力广告
// @namespace    http://www.liaobaocheng.com
// @version      2.0
// @description  让种子更加纯粹
// @author       You
// @match        http://zhongzicili.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js
// ==/UserScript==

(function () {
    'use strict';


    var iframes = document.getElementsByTagName('iframe');
    for (var ii = 0; ii < iframes.length; ii++) {
        iframes[ii].style.display = 'none';
    }
    console.log('oooooo');

    $("*[style*='position:fixed']").each(function () {
        $(this).css('display', 'none');
    });

    var images = document.getElementsByTagName('img');
    for (var jj = 0; jj < images.length; jj++) {
        images[jj].style.display = 'none';
    }

})();

