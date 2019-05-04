// ==UserScript==
// @name         扇贝听力、一键展开
// @namespace    none
// @version      0.2
// @description  一键展开覆盖单词
// @author       You
// @match        https://www.shanbay.com/listen/*
// @grant        none
// ==/UserScript==

function exp() {
    items = document.querySelector('#test-or-preview > div.row-fluid.sentence-content.hide > div > p').children;
    for(var i=0;i<items.length;i++){
        items[i].click();
    }
};

var click_btn = document.createElement('li');
var click_a = document.createElement('a');
click_a.innerText="展开所有";
click_a.onclick = function(){exp();};
click_btn.appendChild(click_a);
var ul = document.querySelector('#main-navbar > div.sub-menu.active > ul');
ul.appendChild(click_btn);