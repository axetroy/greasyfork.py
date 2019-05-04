// ==UserScript==
// @name        Canva Design Website Dark Theme Night Mode - subtle
// @namespace   english
// @description Canva Design Website Dark Theme Night Mode - subtle changes
// @include     http*://*canva.com*
// @version     1.3
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==



var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '                                                  body {/*\n*/    /*\n*/    background-color: #6b6b6b;/*\n*/ /*\n*/}#canvaDocument > .inner {/*\n*/    /*\n*/    background-color: #6b6b6b;/*\n*/   /*\n*/}.editorControlsInner {/*\n*/   /*\n*/    background-color: #272c33; /*\n*/} #documentTitleAndMenu a, #documentTitleAndMenu button {    background-color: rgba(0, 0, 0, 0.79); }
                     ';
document.getElementsByTagName('head')[0].appendChild(style);



