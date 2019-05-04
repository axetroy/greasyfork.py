// ==UserScript==
// @name         Remove privacy confirm of zhihu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除知乎的隐私条款同意弹窗
// @author       juncaixinchi
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let count = 0;
    const fire = () => {
        const child=document.getElementsByClassName("Modal-wrapper")[0];
        if (child) {
            child.parentNode.removeChild(child);
            document.getElementsByTagName("html")[0].setAttribute("style", "");
            console.log('remove privacyConfirm');
        } else {
            count += 1;
            if (count < 100) setTimeout(fire, 100);
        }
    };
    fire();
})();