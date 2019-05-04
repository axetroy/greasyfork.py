// ==UserScript==
// @name         屏蔽熊猫令&屏蔽顶部底部弹幕
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  屏蔽严重遮住视线的熊猫令.新增屏蔽底部和顶部固定弹幕,不需要的删除第22~25行.
// @author       lampwu
// @match        https://www.panda.tv/*
// @grant        none
// ==/UserScript==

var m = function (f) {
    return f.toString().split('\n').slice(1, - 1).join('\n');
};
loadCss = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = m(function () { /*
            .h5player-plugins {
               display: none;
               visibility: hidden;
            }
            div[style*="left: 50%"] {
               display: none;
               visibility: hidden;
            }

          */
    });
    var head = document.querySelector('head');
    head.appendChild(style);
};
loadCss();