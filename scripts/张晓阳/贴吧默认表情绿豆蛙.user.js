// ==UserScript==
// @name         贴吧默认表情绿豆蛙
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  使用绿豆蛙表情
// @author       wuzhizhemu569@gmail.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @match        https://tieba.baidu.com/p/*
// @match        http://tieba.baidu.com/p/*
// @match        http://tieba.baidu.com/*
// @match        https://tieba.baidu.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    $('body').on('click', '.edui-icon-emotion,.lzl_insertsmiley_holder', (e) => {
        showFrag();
    });

    function showFrag() {
        if ($('.ldw-tab').length > 0) return;
        let eduiContainer = $('.edui-dialog-container');
        eduiContainer.hide();
        let faceTab = $('.s_tab_content');
        if (faceTab.length) {
            faceTab.prepend('<li class="s_tab_btn selected ldw-tab" data-index="1" data-type="ldw"><span class="s_tab_btnbg">绿豆蛙</span></li>');
        }
        $('.ldw-tab').click();
        eduiContainer.show();
    }

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */