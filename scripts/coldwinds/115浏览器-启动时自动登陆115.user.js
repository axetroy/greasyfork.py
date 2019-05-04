// ==UserScript==
// @name         115浏览器-启动时自动登陆115
// @namespace    http://115.com/
// @version      0.1
// @description  启动时自动登陆115
// @author       Kernel
// @match        http://115.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var submit_btn = document.querySelector('#js-submit');
    if(submit_btn) {
        window.setTimeout(function(){
            submit_btn.click();
        }, 1000 * 5);
    }
})();