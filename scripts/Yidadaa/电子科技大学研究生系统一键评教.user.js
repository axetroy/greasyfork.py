// ==UserScript==
// @name         电子科技大学研究生系统一键评教
// @namespace    https://github.com/Yidadaa
// @version      0.1
// @description  评教，评个屁
// @author       github.com/Yidadaa
// @match        http://yjsjy.uestc.edu.cn/pyxx/pygl/jxpj/edit/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function $$ (s) {
        return Array.from(document.querySelectorAll(s));
    }
    function $ (s) {
        return document.querySelector(s);
    }

    const texts = [
        '使用了原版教材，使用了全部学时。',
        '风格严谨不失风趣，令人引人入胜。',
        '没有使用英语教学。',
        '老师讲课十分不错，希望老师能保持讲课的激情。'
    ];

    const justFuck = (type = 'max') => {
        const inputs = $$('input').filter(v => v.name.startsWith('qz') && v.type==='radio' && v.value);
        const values = new Set(inputs.map(v => parseFloat(v.value)));
        const max = Math.max(...values);
        const min = Math.min(...values);
        const vMap = {
            'max': Math.max(...values),
            'min': Math.min(...values)
        };
        inputs.forEach(v => {
            if (v.value == vMap[type]) v.click();
        });
        $$('textarea').forEach((v, i) => {
            v.value = texts[i % texts.length]
        });
    };

    const okBtn = document.createElement('button');
    const fuckBtn = document.createElement('button');
    const btnTexts = ['全员好评', '全员差评'];
    const btnTypes = ['max', 'min'];

    [okBtn, fuckBtn].forEach((v, i) => {
        v.className = 'btn btn-xs btn-success';
        v.style = 'margin-top: 5px; margin-right: 5px;';
        v.onclick = () => justFuck(btnTypes[i]);
        v.innerHTML = `<i class="icon-cancel  align-top bigger-150"></i>` + btnTexts[i].split('').join('♂');
        $('.widget-toolbar').append(v);
    });
})();