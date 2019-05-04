// ==UserScript==
// @name         Отключить все стили
// @namespace    DisAllStyle
// @version      0.1
// @description  Remove all styles!
// @include        *
// @grant        none
// ==/UserScript==

window.addEventListener('load',function(){
    but=document.createElement('button');
    but.onclick=function(){
        var st=document.createElement('style');
        st.innerText='*{all:unset !important;}';
        document.body.appendChild(st);
        this.remove();
    };
    but.innerText='Disable All Styles';
    but.style.position='fixed';
    but.style.bottom='0';
    but.style.right='0';
    but.style.zIndex='99999999999';
    document.body.appendChild(but);
});