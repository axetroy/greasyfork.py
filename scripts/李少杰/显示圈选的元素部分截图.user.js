// ==UserScript==
// @name         显示圈选的元素部分截图
// @namespace    http://tampermonkey.net/
// @version      0.3.3
// @description  try to take over the world!
// @author       You
// @match        *://*.growingio.com/projects/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

document.addEventListener("click", function(e) {
    var sdiv = document.getElementsByClassName("screenshot");
    for(var i = 0; i < sdiv.length; i++) {
        var sc = sdiv[i];
        var vp = sc.children[0];
        if(vp.src.match(/\/\/gta.growingio.com\/uploads\/.*\/viewport.jpg/)) {
           var target = document.createElement("img");
           target.src = vp.src.replace("viewport", "target");
           target.style.border = "dashed red";
           target.style.position = 'static';
           vp.style.position = 'static';
           sc.insertBefore(target, vp);
        }
    }
});