// ==UserScript==
// @name         Yande.re 键盘翻页 Keyboard flip
// @namespace    https://www.mokeyjay.com/
// @version      0.1
// @description  使用键盘方向键左右翻页
// @author       mokeyjay
// @match        https://yande.re/post*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('keyup', function(e){
        if(e.keyCode == 37){
            document.querySelector('a.previous_page').click();
        } else if(e.keyCode == 39){
            document.querySelector('a.next_page').click();
        }
    });
})();