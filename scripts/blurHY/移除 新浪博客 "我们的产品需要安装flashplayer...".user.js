// ==UserScript==
// @name         移除 新浪博客 "我们的产品需要安装flashplayer..."
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Sina blog anoyying 'Flash needed' alert! 移除 "我们的产品需要安装flashplayer 10或更高版本，请 点击此处 免费下载"
// @author       blurhy
// @match        *://blog.sina.com.cn/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
document.body._appendChild=document.body.appendChild
document.body.appendChild=function process(stuff){
    if(stuff.innerText!== "提示标题关闭 " && stuff.id!=="ramdomVisitDiv"){
        document.body._appendChild(stuff);
    }
    else{
        console.log(stuff)
    }
}