// ==UserScript==
// @name         FK ISCLAB
// @namespace    YinTianliang-i
// @version      0.1
// @description  使自己能够心平气和地做题
// @author       YinTianliang
// @match        http://iscc2018.isclab.org.cn:4000/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function getInput(mes) {
        let input;
        do {
            input = prompt(mes);
        } while (input === null);
        return input;
    }
    let getKey = (key) => { return localStorage[key]; };
    let setKey = (key, value) => { localStorage[key] = value; };

    let username = getKey('username');
    let password = getKey('password');

    if (!username || !password) {
        username = getInput("请输入用户名:");
        password = getInput("请输入密码：");
        setKey("username", username);
        setKey("password", password);
    }
    function fuck() {
        console.log('FK ISLAB');
        $.post('http://iscc2018.isclab.org.cn:4000/login', {name: username, password: password});
        setTimeout(fuck, 10000);
    }
    fuck();
})();