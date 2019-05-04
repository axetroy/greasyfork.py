// ==UserScript==
// @name         Enable_2dfan_copy_function
// @namespace    http://www.2dfan.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.2dfan.com/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    var alldiv = $("div");
    $.each(alldiv, function (index, value) {
        var a = value;
        a.oncopy=function(){};
        a.oncut=function(){};
    });
})();