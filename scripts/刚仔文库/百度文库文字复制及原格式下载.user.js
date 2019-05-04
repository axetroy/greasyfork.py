// ==UserScript==
// @name         百度文库文字复制及原格式下载
// @namespace    gangzai
// @version      0.33
// @description  为百度文库页面添加两个按钮，一键复制百度文库文字,一键加群获取原格式文档
// @author       gangzai
// @match        *://wenku.baidu.com/view/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
(function() {
'use strict';

if(!$){
var s = document.createElement ("script");
s.src = "http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js";
s.async = false;
document.documentElement.appendChild (s);
}

let timeoutId = -1;
let downloadBtn = '<div id="reader-copy-div" style="float:left;padding:10px 20px;background:green;z-index:999;position:relative;top:60px;left:-115px;"><a id="reader-copy-text" href="###" style="color:white;font-size:15px;"><b class="ui-btn-btc">复制此页面</b></a></div>';
let toEmailBtn = '<div id="reader-copy-div" style="float:left;padding:10px 20px;background:green;z-index:999;position:relative;top:110px;left:0px;"><a id="reader-copy-toemail" href="javascript:void(0)" style="color:white;font-size:15px;"><b class="ui-btn-btc">下载原格式</b></a></div>';
let toastDiv = '<div id="page-toast-div" style="margin: 0px auto;background: black;opacity: 0.8;padding: 15px 30px;position: fixed;z-index: 10001;display: block;top: 85%;left: 44%;"><span id="page-toast-span" style="color:white;font-size:15px;"></span></div>';
let opacity = '0.95';
let ua = navigator.userAgent;
if(ua.indexOf("Edge") >= 0){
opacity = '0.6';
}
else if(ua.indexOf("Chrome")){
opacity = '0.95';
}
let textBlockDiv = '<div id="page-textblock-div" style="width:100%;height:100%;position: fixed;z-index: 9999;display: block;top: 0px;left: 0px;background:rgba(255,255,255,' + opacity + ');-webkit-backdrop-filter: blur(20px);display: flex;justify-content:center;align-items:center;"><div id="page-textblock-cancel-layer" style="width:100%;height:100%;position:fixed;top:0px;left:0px;"></div><pre id="page-textblock" style="width:60%;font-size:16px;line-height:22px;z-index:10000;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break:break-all;max-height:70%;overflow:auto;"></pre></div>"';
let dialogA = '<div id="dialogTpl" style="display:none;background: #bff;box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);overflow: hidden;width: 500px;height: 200px;border: 1px solid #dcdcdc;position: fixed;z-index: 10000;top: 0;right: 0;bottom: 0;left: 0;margin: auto;"><span id="closeBtn" style="position: absolute;right: 5px;top: 5px;width: 16px;height: 16px;line-height: 16px;text-align: center;font-size: 18px;cursor: pointer;">×</span><div style="padding: 23px 13px;display: table;width: 100%;height: 100%;"><div style="vertical-align: middle;width: 100%;height: 100%;font-size: 14px;">1、可以点击下方的QQ群下载把链接发到群里。<br/><br/>2、您也可以手动将此网页网址发送至邮箱467897369@qq.com获取原格式文档；<br/></div></div><div style="display: table;table-layout: fixed;width: 100%;position: absolute;bottom: 0;left: 0;border-top: 1px solid #dcdcdc;"><span id="getYuan" style="display: table-cell;width: 50%;height: 50px;line-height: 50px;text-align: center;cursor: pointer;">QQ群下载</span><span id="getEmail" class="btn" style="display: table-cell;width: 50%;height: 50px;line-height: 50px;text-align: center;cursor: pointer;border-left: 1px solid #dcdcdc;">复制邮箱</span></div></div>';
function Copy(str){
let result = false;
let save = function(e){
e.clipboardData.setData('text/plain', str);
e.preventDefault();
}
document.addEventListener('copy', save);
result = document.execCommand('copy');
document.removeEventListener('copy',save);
return result;
}
function ShowToast(str){
if(timeoutId >= 0){
clearTimeout(timeoutId);
}
$('#page-toast-div').remove();
$('body').append(toastDiv);
$('#page-toast-span').text(str);
timeoutId=setTimeout("$('#page-toast-div').remove();",1500);
}

function ShowTextBlock(str){
$('#page-textblock-div').remove();
$('body').append(textBlockDiv);
$('#page-textblock').text(str);
$('#page-textblock-cancel-layer').click(function(){
$('#page-textblock-div').remove();
});
}

function PrependButtonTo(ele){
ele.prepend(downloadBtn);
ele.prepend(toEmailBtn);
$('body').append(dialogA);
$('body').find('#dialogTpl').hide();
ele.find('#reader-copy-text').click(function(){
let str = "";
let parent = $(this).parent().parent();
parent.find('.reader-word-layer').each(function(){
str += this.innerText.replace(/\u2002/g,' ');
});
str = str.replace(/。\s/g,'。\r\n');
let result= (str.length > 0);
if(result){
ShowToast("解析成功");
ShowTextBlock(str);
}else{
ShowToast("解析失败，请等待网页加载");
}
});
$('body').find('#getYuan').click(function() {
window.location.href = "https://jq.qq.com/?_wv=1027&k=56qc8p6";
//window.location.href = "mailto:467897369@qq.com?subject=获取完整文件&body="+window.location.href;
$('#dialogTpl').hide();
});
$('body').find('#getEmail').click(function() {
Copy('467897369@qq.com');
$('#dialogTpl').hide();
ShowToast("复制邮箱成功，现在您可以发送邮件获取原格式文档！");
});
ele.find('#reader-copy-toemail').click(function() {
$('#dialogTpl').show();
});
$('body').find('#closeBtn').click(function() {
$('#dialogTpl').hide();
});
}


$(document).ready(function(){
$('.mod.reader-page.complex, .ppt-page-item, .mod.reader-page-mod.complex').each(function(){
PrependButtonTo($(this));
});
});
})();