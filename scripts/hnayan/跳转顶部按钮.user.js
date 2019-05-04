// ==UserScript==
// @name        跳转顶部按钮
// @namespace   https://github.com/lilopusic/jumpToTop
// @description 为网页添加一个跳转到顶部的按钮
// @include	    http://*
// @include	    https://*
// @version     1.0.5
// @resource    custom_css https://raw.githubusercontent.com/lilopusic/jumpToTop/master/style.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

(function () {
    'use strict';

    const document = window.top.document;

    function add_button_style() {
        GM_addStyle(GM_getResourceText("custom_css"));
    }

    function dom(tag, attr, inner, eventFunc) {
        let el = document.createElement(tag);
        for (let key in attr) {
            if (attr.hasOwnProperty(key)) {
                el.setAttribute(key, attr[key]);
            }
        }
        if (inner) {
            el.innerHTML = inner;
        }
        for (let key in eventFunc) {
            switch (key) {
                case 'click':
                    el.onclick = eventFunc[key];
                    break;
                default:
                    break;
            }
        }
        return el;
    }

    function jumpToTop() {
        let rolling = function () {
            let top = document.body.scrollTop;
            if (top === 0) {
                clearInterval(timer);
            }
            window.scrollTo(document.body.scrollLeft, document.body.scrollTop -= 25);
        };
        let timer = setInterval(rolling, 0.5); //设置定时器
    }

    window.addEventListener('scroll', function (e) {
        if (document.body.scrollTop < 50) {
            document.getElementById('jumpToTopBtn').style.display = 'none';
        } else {
            document.getElementById('jumpToTopBtn').style.display = 'block';
        }
    });


    let panel = dom('div', {
        id: 'jumpToTopBtn'
    }, 'Jump!', {
        click: jumpToTop
    });
    add_button_style();
    document.body.appendChild(panel);



})();