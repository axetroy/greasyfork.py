// ==UserScript==
// @name         斗鱼界面清理
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var q = function(selector) {
        return document.querySelector(selector);
    };
    var qs = function(selector) {
        return document.querySelectorAll(selector);
    };
    var rn = function(node) {
        if (typeof node == 'string') {
            node = q(node);
        }
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    };
    var s = function(node, css, value) {
        if (typeof node == 'string') {
            node = q(node);
        }
        if (!node) {
            return;
        }
        if (typeof css == 'string') {
            node.style[css] = value;
        }
        else {
            for (var i in css) {
                node.style[i] = css[i];
            }
        }
    };
    var wait = function(selector, index) {
        return new Promise(function(resolve, reject) {
            var loop = function() {
                setTimeout(function() {
                    var node;
                    if (index) {
                        node = document.querySelectorAll(selector)[index];
                    }
                    else {
                        node = document.querySelector(selector);
                    }
                    if (node) {
                        resolve(node);
                    }
                    else {
                        loop();
                    }
                }, 1000);
            };
            loop();
        });
    };
    
    s('#header', 'position', 'static');
    s('#js-live-room-normal-left', 'margin', '0');
    s('#mainbody', 'margin-top', '0');
    
    setTimeout(function() {
        s('video', {
            width: '100%',
            height: '100%'
        });
        rn(qs('canvas')[1]);
        wait('canvas', 1).then(function(res) {
            rn(res);
        });
    }, 0);
    rn('#js-live-room-normal-right');
    rn('.anchor-impress');
    rn('#fansbox');
    rn('.PlayerSub');
    rn('#left');
    rn('.anchor-impress');
    rn('.sq-wrap');
    rn('.tag-fs-con');
    rn('.acinfo-fs-con');
    s('.anchor-pic', {
        width: '60px',
        height: '60px'
    });
    s('.anchor-pic img', {
        width: '60px',
        height: '60px'
    });
    s('.room-mes', {
        display: 'flex',
        'align-items': 'center',
        height: '60px'
    });
    s('.relate-text', {
        margin: '0 0 0 80px'
    });


})();