// ==UserScript==
// @name         硬币站自动签到
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  硬币站签到
// @author       zaqw6414
// @match        https://www.chrono.gg*
// @match        https://www.chrono.gg/*
// @grant        none
// ==/UserScript==
(function() {
var a1= /reward-coin([\w\W]*)/;
var jsq = setInterval(function dianji(){panduandianji()},3000);//定时
var ss = document.getElementById('reward-coin');
var bk1 = 0;
function panduandianji(){
var b1 = a1.exec(document.documentElement.outerHTML)[0].slice(20,25)
if (b1 == 'coin"'){
ss.click()
clearInterval(jsq);//清除定时器
}
else{
bk1++
    if (bk1 >= 10){
        console.log('大于30秒，关闭计时器')
        clearInterval(jsq)}
}
}}
)();