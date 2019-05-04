// ==UserScript==
// @name         掘金复制内容版权去除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除掘金复制内容时，自带的版权信息
// @author       GodD
// @match        https://juejin.im/post/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let timer = setInterval(()=>{
        let con = document.querySelector('#juejin > div.view-container > main > div.view.column-view');
        if(!con){
            return;
        }

        clearInterval(timer);
        setTimeout(()=>{
            console.info('剪切板初始化')
            con.addEventListener('copy',()=>{
                event.preventDefault();
                event.stopPropagation();
                console.info('触发复制事件')
                let textData = window.getSelection().getRangeAt(0);
                let node = document.createElement('div');
                node.appendChild(window.getSelection().getRangeAt(0).cloneContents());
                if(event.clipboardData){
                    event.clipboardData.setData("text/html", node.innerHTML);
                    event.clipboardData.setData("text/plain",textData);
                }
                else if(window.clipboardData){
                    return window.clipboardData.setData("text", textData);
                }
            })
        },500)
    },200)
    })();