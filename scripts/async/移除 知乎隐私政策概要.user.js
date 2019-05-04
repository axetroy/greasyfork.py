// ==UserScript==
// @name         移除 知乎隐私政策概要
// @name:en      Remove Zhihu Privacy Modal
// @namespace    https://www.zhihu.com/
// @version      0.1
// @description  移除 知乎隐私政策概要 弹出层
// @description:en Remove Zhihu Privacy Modal Summary
// @author       Michael
// @match        *://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    function removePrivacyModal(){
        var modalNode = document.getElementsByClassName('PrivacyConfirm-modal')[0];
        if(modalNode !== undefined)
        {
            while (modalNode.parentNode !== document.body)
            {
                modalNode = modalNode.parentNode;
            }
            modalNode.remove();
            document.body.parentNode.style.overflow = '';
            window.clearInterval(removeInterval);
        }
    }

    var removeInterval = window.setInterval(removePrivacyModal, 500);
    removePrivacyModal();
})();