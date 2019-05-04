// ==UserScript==
// @name         google translate utils
// @name:zh-CN   google翻译实用工具
// @namespace    https://github.com/tabedit/tamperMonkey
// @version      0.3
// @description  auto remove line break for google translate(replaced with space)
// @description:zh-CN 自动移除google翻译原文中的换行符（替换为空格）
// @author       tabedit
// @include     http*://translate.google.*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // all element and other variable
    var textarea = document.getElementById('source'),
    container = document.querySelector('body > div.frame > div.page.tlid-homepage.homepage.translate-text > div.input-button-container'),
    customButton = document.createElement('div'),
    replaceOn = false;

    // function for replace word
    function replaceWord(){
        if (typeof replaceWord.innerFunc === 'undefined'){
            replaceWord.innerFunc = function (){
                textarea.value = textarea.value.replace(/-[\r\n]/g,'').replace(/[\r\n]/g,' ');
            }
        }
        setTimeout(replaceWord.innerFunc, 200);
    }

    // button for switch whether turn replace on
    customButton.addEventListener('click',function(event){
        if(!replaceOn){
            replaceOn = true;
            customButton.style.backgroundColor='#E4ECFA';
            textarea.addEventListener('paste', replaceWord);
            replaceWord();
        }else{
            replaceOn = false;
            customButton.style.backgroundColor='#FAFAFA';
            textarea.removeEventListener('paste', replaceWord);
        }
    });
    customButton.className = 'tlid-input-button input-button header-button tlid-input-button-docs';
    customButton.appendChild(document.createElement('div'));
    customButton.style.paddingLeft = '16px';
    customButton.childNodes[0].innerHTML = '自动替换换行';
    customButton.childNodes[0].className = 'text';
    container.appendChild(customButton);
})();