// ==UserScript==
// @name         css88辅助工具
// @namespace    https://blog.tofuliang.tk/
// @version      0.1
// @description  css88上的辅助性工具，用于去除广告等
// @author       tofuliang
// @match        http://www.css88.com/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var uw = this;
    var ac = uw.Node.prototype.appendChild;
    uw.Node.prototype.appendChild = function(dom) {
        if ((dom.nodeName || dom.tagName).toUpperCase() === 'DIV' && this.tagName === 'BODY' && dom.querySelector('.cry-face-con-close')) {
            uw.Node.prototype.appendChild = ac;
            return;
        }
        return ac.apply(this, Array.prototype.slice.call(arguments));
    };
}).apply(unsafeWindow);
