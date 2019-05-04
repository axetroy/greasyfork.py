// ==UserScript==
// @name         掘金文章免登录展开全文
// @namespace    haseeer@gmail.com
// @version      0.1.3
// @description  显示全文
// @author       泥壕
// @match        https://juejin.im/post/*
// ==/UserScript==

(function() {
    'use strict';
    function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    function clearBlock() {
        setTimeout(()=>{
            document.querySelector(".show-full").remove();
            document.querySelector(".show-full-block").remove();
            document.querySelector(".post-content-container").style.maxHeight = "";
        },300);
    }
    ready(clearBlock);
})();
