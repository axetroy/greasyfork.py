// ==UserScript==
// @name         图片下载工具
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  图片下载工具，默认针对所有网页，在需要使用时按Esc 键之后点击图片，特征码为图片url 部分信息，可以自己调整。图片过多时，调用窗口可能被浏览器拦截，请点击允许。
// @author       Raveny
// @include     *
// ==/UserScript==

(function() {
    'use strict';

document.onkeydown=function(event){
var e = event || window.event || arguments.callee.caller.arguments[0];
//设置按键绑定
if(e && e.keyCode==27){

var link = function(event){
//功能部分
event.preventDefault();
event.stopPropagation();

if(event.target.tagName == "IMG"){
//验证点击标签为图片

var img_src = new Array()
//创建数组

var inus = event.target.src.substring(0, event.target.src.lastIndexOf("\/")+1);
var format = event.target.src.substring(event.target.src.lastIndexOf("\."),event.target.src.length);
//分割URL 获取最后 / 符号之前部分作为预设特征码,获取格式
var inpusers = prompt(" 请输入特征码",inus); // 弹出用户输入input框

if(inpusers){

var img = document.getElementsByTagName("img")
//获取页面中 img 标签
for(var i = 0;i<img.length;i++){

if(img[i].src.indexOf(inpusers) !== -1 && img[i].src.substring(img[i].src.lastIndexOf("\."),img[i].src.length) == format && img[i].src.lastIndexOf("\/") == event.target.src.lastIndexOf("\/")){
//判断URL 中存在特征码,并且格式、字符长度相符
if(document.evaluate('//img[@src="'+img[i].src+'"]', document).iterateNext() !== null){
var source = document.evaluate('//img[@src="'+img[i].src+'"]', document).iterateNext().parentNode;
//尝试查找小图标的原图地址
if(source.tagName == "A" && source.href.substring(source.href.lastIndexOf("\."),source.href.length) == format){img[i].src = source.href};
}
if(img_src.indexOf(img[i].src) == -1){
//判断数组中是否存在这个链接
img_src[img_src.length] = img[i].src
}
}
}
var text = event.target.alt.replace(/[^\u4e00-\u9fa5]/g, '')

if(text == "" && document.evaluate('//h1', document).iterateNext() !== null){
text = document.evaluate('//h1', document).iterateNext().innerHTML.replace(/[^\u4e00-\u9fa5]/g, '')
}
if(text == ""){
text = "如需自定图片名称可以在此输入，否则请直接点击确定"
}
//尝试获取图片自身名称
var inp = prompt("检测图片 "+img.length+' 张 ，匹配图片 '+img_src.length+' 张。\n' + img_src.join('\n'),text);
if(inp !== null){

img_src.forEach(function(url) {
//遍历数组中的链接执行下面操作
if(img_src.length == 1){var n = ""}else{n = "("+String(img_src.indexOf(url)+1)+")"}
if(inp == ("" || "如需自定图片名称可以在此输入，否则请直接点击确定")){var name = url.substring(url.lastIndexOf("\/")+1,url.length)}else{name = inp+n+format}

var alink = document.createElement("a");
//创建 a 标签准备调用执行下载
alink.href = url
alink.download = name
alink.click()
});
}
}
}
//删除鼠标点击事件
document.removeEventListener('click', link, true);
}
//绑定鼠标点击事件
document.addEventListener('click', link, true);
}
}
})();