// ==UserScript==
// @name         Tieba百度贴吧楼中楼(回复楼)的楼主标识
// @namespace    http://nickdoth.cc/
// @version      0.2.1
// @description  在贴吧楼中楼回复者中标识出楼主，效果类似手机版
// @compatible   chrome
// @compatible   firefox
// @compatible   safari
// @license      MIT
// @author       nickdoth
// @match        http://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/p/*
// @grant        unsafeWindow
// ==/UserScript==

// MIT License
//
// Copyright (c) 2019 nickdoth
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function() {
    'use strict';

    // Sheet
    var styleEl = unsafeWindow.document.createElement('style');
    unsafeWindow.document.head.appendChild(styleEl);
    var sheet = styleEl.sheet;

    sheet.insertRule(`a.at[username="${unsafeWindow.PageData.thread.author}"]:after {
        content: "楼主";
        background: #17a;
        color: #fff;
        border: 1px transparent solid;
        border-radius: 5px;
        padding: 2px 4px;
        margin-left: 1px;
        margin-right: 1px;
        font-size: 12px;
    }`, 0);
})();