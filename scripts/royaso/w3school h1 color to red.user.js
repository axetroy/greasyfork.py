// ==UserScript==
// @name         w3school h1 color to red
// @namespace    https://github.com/royaso/w3school_userscript
// @version      0.1
// @description  w3school  html dom  header color change to red
// @author       royaso
// @match        http://www.w3school.com.cn/htmldom/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var maincontent=document.getElementById('maincontent');
    var header1=maincontent.getElementsByTagName('h1')[0];
    header1.style.color='pink';


})();
