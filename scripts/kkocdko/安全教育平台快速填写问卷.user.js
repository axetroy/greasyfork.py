// ==UserScript==
// @name         安全教育平台快速填写问卷
// @description  一键点击问卷页面上的所有选项
// @namespace    https://greasyfork.org/users/197529
// @version      0.5
// @author       kkocdko
// @include      *://zhuanti.xueanquan.com/*
// @include      *://huodong.xueanquan.com/*
// ==/UserScript==

function addButton(showText, callBack) {
    let button = document.createElement('button');
    button.style = 'position:fixed;float:left;margin:5px;padding:5px 16px;border-radius:4px;outline:none;border:none;background:rgb(26,115,232);color:#fff;z-index:3';
    button.addEventListener('click', callBack);
    button.innerText = showText;
    let topBar = document.body;
    topBar.insertBefore(button, topBar.firstElementChild);
}

addButton('Click All', () => {
    for (let item of document.querySelectorAll('[type=radio], [type=checkbox]')) {
        if (item.checked == false) {
            item.click();
        }
    }
});