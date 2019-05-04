// ==UserScript==
// @name         火猫TV自动领仙豆
// @namespace    https://greasyfork.org/
// @version      0.1
// @description  用于火猫TV自动领仙豆
// @author       Dash Chen
// @match        https://www.huomao.com/*
// @grant        none
// ==/UserScript==

window.setInterval(function() {
    var node = document.getElementById("getxd");
    var time = node.children[1].textContent;
    if (time === '') {
        //node.click();
        //console.log('node');
        document.getElementsByClassName('okby')[0].click();
        //console.log('dou'+i);
        //document.getElementsByClassName('confirm-button')[0].click();
        //console.log('btn');
    }
}, 1000);
