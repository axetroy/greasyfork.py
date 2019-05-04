// ==UserScript==
// @name        亚马逊<管理我的内容和设备>:批量删除文件
// @namespace    undefined
// @version      0.1
// @description  亚马逊<管理我的内容和设备>:批量删除文件!
// @author       北漂梧桐
// @match        https://www.amazon.cn/mn/dcw/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // a function that loads jQuery and calls a callback function when jQuery has finished loading
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }
    function remainTime(){
        $("#dialogButton_ok_myx").click();

        $('#chk0').click();
        $('#chk1').click();
        $('#chk2').click();
        $('#chk3').click();
        $('#chk4').click();
        $('#chk5').click();
        $('#chk6').click();
        $('#chk7').click();
        $('#chk8').click();
        $("#contentAction_delete_myx").click();
        $("#dialogButton_ok_myx").click();
        $("#dialogButton_ok_myx").click();
        setTimeout(remainTime,3000);
    }
    addJQuery(remainTime);
})();