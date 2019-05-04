// ==UserScript==
// @name         ピクトセンス - キャンバスを薄くする
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  キャンバスを薄くします。他の人には影響しません。
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

    const diff = 100;//薄くする度合い（この数値が大きいほど薄くなる。最大値:255）
    add_button("薄くする",()=>{
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        const d = pixels.data;
        for (let i = 0; i < d.length; i+=4) {
            d[i+3] -= diff;
        }
        context.putImageData(pixels, 0, 0);
    })
})();