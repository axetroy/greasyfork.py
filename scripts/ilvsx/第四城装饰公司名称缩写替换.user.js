// ==UserScript==
// @name         第四城装饰公司名称缩写替换
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://www.4c.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    let data = [
        {reg: new RegExp('LMZS', 'ig'), value: '良美装饰'},
        {reg: new RegExp('LM', 'ig'), value: '良美装饰'},
        {reg: new RegExp('HGZS', 'ig'), value: '鸿阁装饰'},
        {reg: new RegExp('HG', 'ig'), value: '鸿阁装饰'},
        {reg: new RegExp('JYHLZS', 'ig'), value: '锦燕互联装饰'},
        {reg: new RegExp('JYHL', 'ig'), value: '锦燕互联装饰'},
        {reg: new RegExp('JY', 'ig'), value: '锦燕互联装饰'},
    ]

    for(let v of data) {
        document.body.innerHTML = document.body.innerHTML.replace(v.reg, ` ${v.value} ` )
    }
    // Your code here...
})();