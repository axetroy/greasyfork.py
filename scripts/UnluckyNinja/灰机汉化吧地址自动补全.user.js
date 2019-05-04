// ==UserScript==
// @name         灰机汉化吧地址自动补全
// @namespace    https://weibo.com/unluckyninja
// @version      0.1.4
// @description  自动补全4位到链接
// @author       UnluckyNinja
// @include      *://tieba.baidu.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://greasyfork.org/scripts/2199-waitforkeyelements/code/waitForKeyElements.js?version=6349
// @grant        GM_addStyle
// ==/UserScript==

(function($, window) {
    'use strict';

    // Your code here...

    var task = function(target){
        target.html(target.html().replace(/(代码|代号|尾号|末位|四位|四位数|你们懂得)(\d{4})(?!：)/g, "$&：<a href=\"http://smp.yoedge.com/view/omnibus/100$2\" target=\"_blank\">http://smp.yoedge.com/view/omnibus/100$2</a>"));
    };

    waitForKeyElements (".d_post_content", task);

}).call(unsafeWindow || window, (unsafeWindow || window).$, unsafeWindow || window);