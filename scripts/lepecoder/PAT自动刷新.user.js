// ==UserScript==
// @name         PAT自动刷新
// @version      0.1
// @description  try to take over the world!
// @author       lepeCoder
// @match        https://www.patest.cn/submissions/*
// @namespace https://greasyfork.org/users/164817
// ==/UserScript==

(function() {
    'use strict';
    var s0 = document.getElementsByClassName("submitRes-0");
    var s1 = document.getElementsByClassName("submitRes-1");
		if(s0.length+s1.length>0){
            window.location.reload();
        }
    // Your code here...
})();