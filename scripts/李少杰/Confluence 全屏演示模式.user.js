// ==UserScript==
// @name         Confluence 全屏演示模式
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://wiki.sankuai.com/pages/viewpage.action?pageId=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var decors = ['#header', '#full-height-container > div.ia-splitter > div.ia-splitter-left', '#footer', '#main-header'];
    var showDecors = true;
    var mainMargin;
    var button = document.createElement('button');
    button.innerText = '演示模式';
    button.style = 'position: fixed;right: 10px;bottom: 30px; border: none;opacity: 1;cursor: pointer; transition: opacity ease .6s;background-color: #FF9900; border-radius: 10px; font-size: 16px; color: white; box-shadow:0px 2px 10px 0px #FF6600; text-decoration: none;';
    button.addEventListener('mouseover', function(e) {
        button.style.opacity = 1;
    });
    button.addEventListener('mouseleave', function(e) {
        button.style.opacity = 0;
    });
    setTimeout(function() {
        button.style.opacity = 0;
    }, 3000);
    button.addEventListener('click', function() {
        showDecors = !showDecors;
        console.log(showDecors ? "exiting" : "entering", "fullscreen mode");
        var dis = showDecors ? 'block' : 'none';
        for (var i = decors.length - 1; i >= 0; i--) {
            document.querySelector(decors[i]).style.display = dis;
        }
        var main = document.querySelector('#main');
        if (!showDecors) {
            mainMargin = main.style.marginLeft;
            main.style.marginLeft = 0;
        } else {
            main.style.marginLeft = mainMargin;
        }
    });
    document.body.appendChild(button);
})();