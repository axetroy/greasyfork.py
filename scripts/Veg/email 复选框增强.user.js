// ==UserScript==
// @name          email 复选框增强
// @namespace    https://www.zhihu.com/people/yin-xiao-bo-11
// @version      0.1.1
// @description  chrome 下，给 QQ 邮箱读屏版的邮件复选框增加名称，给html 试图的 gmail 邮箱邮件复选框增加名称
// @author       Veg
// @include    https://mail.google.com/*
// @include    *mail.qq.com/*
// @grant        none
// ==/UserScript==

var url = window.location.href;
var tokens = url.substring(7,13);
if(tokens=='/mail.') {
var table=document.querySelector('table.th');
var input=table.querySelectorAll('input');
for (var i=0; i<input.length; i++) {
input[i].setAttribute("aria-labelledby",i);
var a=table.querySelectorAll('a[href]');
for (var g=0; g<a.length; g++) {
a[g].setAttribute("id",g);
} }
}
if(tokens=='w.mail') {
var f=document.querySelector('form[id="form"]');
var input=f.querySelectorAll('input');
for (var i=0; i<input.length; i++) {
input[i].setAttribute("aria-labelledby",i);
var a=f.querySelectorAll('a[href]');
for (var g=0; g<a.length; g++) {
a[g].setAttribute("id",g);
} }
}
document.addEventListener("keydown",function (k) {
var table=document.querySelector('table.th');
var input=table.querySelectorAll('input');
for (var i=0; i<input.length; i++) {
if(k.shiftKey&&k.keyCode==81) {
input[i].click();
} }
},null);
