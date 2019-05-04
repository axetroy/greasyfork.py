// ==UserScript==
// @name 自动点击
// @version      1.0.4
// @description 定时点击链接的实验！
// @run-at       document-start
// @namespace LostAngle
// ==/UserScript==
function open(){
var hrefs=document.querySelectorAll("a");
    for(var i=0;i<3;i++){
    	window.open('http://www.baidu.com');
    console.log("sss")
    }
}
setTimeout(open,5000)