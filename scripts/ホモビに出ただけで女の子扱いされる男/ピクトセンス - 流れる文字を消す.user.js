// ==UserScript==
// @name         ピクトセンス - 流れる文字を消す
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  流れる文字が残るバグを解消します
// @author       You
// @match        https://pictsense.com/*
// @grant        none
// ==/UserScript==
(() => {
  'use strict';
    const add_button = (_name, _func) => {
        const elm = document.createElement("button");
        elm.innerHTML = _name;
        elm.addEventListener('click', _func);
        const p = document.createElement("p");
        p.append(elm);
        document.getElementById("leaveButton").parentNode.append(p);
    }

    const hide = (_elm) => {
        if(_elm == null)return 0;
        _elm.style.display ='none';
    }

    const hide_all = (_elms) => {
        if(_elms == null)return 0;
        for(let i=0;i<_elms.length;i++)hide(_elms[i]);
    }

    add_button("流れる文字を消す", () => {
        hide_all(document.getElementsByClassName("scrollMessage"));
    });

})();