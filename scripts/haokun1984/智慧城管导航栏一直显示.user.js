// ==UserScript==
// @name         智慧城管导航栏一直显示
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  点开其它面板时，保持导航栏的 display 属性为 block
// @author       You
// @match        http://tampermonkey.net/index.php?version=4.4&ext=dhdg&updated=true
// @grant        none
// @include      http://125.70.9.213:8001/*
// ==/UserScript==

(function() {
    'use strict';

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    // 当导航栏DIV生成以后，锁定 display 属性
    var CSS201920 = '.new-app-panal {display:block!important;}';
    
    addGlobalStyle(CSS201920);
    
})();