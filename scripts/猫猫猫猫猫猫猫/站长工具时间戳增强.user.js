// ==UserScript==
// @name         站长工具时间戳增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tool.chinaz.com/Tools/unixtime.aspx
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     function getTime(){
         let myDate = new Date();
         let str = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}:${myDate.getMilliseconds()}`
         return str
     }
    window.$(function() {
        // Handler for .ready() called.
        window.$('body').append(`<div id="timeS" style="position:fixed;left:0px;bottom:0px;font-size:28px;"></div>`)
        setInterval(() => {
            let str = getTime()
            window.$('#timeS').html(str)
        },1)
    });
})();