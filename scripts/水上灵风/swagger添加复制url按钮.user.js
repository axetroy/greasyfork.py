// ==UserScript==
// @name         swagger添加复制url按钮
// @namespace    http://sslfer.com/
// @version      0.1
// @description  复制 swagger-ui.html 页面的path 的 url
// @author       sslf
// @match        */swagger-ui.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    setTimeout(function (){

        $("#swagger-ui-container .path").after(
            $("<butten>复制</butten>").css("cursor","pointer").click(function (){
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents($(this).prev()[0]);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("Copy")
            }));

    }, 1000);


})();