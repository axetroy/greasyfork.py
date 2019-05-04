// ==UserScript==
// @name        Tampermonkey install page system Dark Theme Night Mode 
// @namespace   english
// @description Tampermonkey install page system Dark Theme Night Mode test
// @include     *moz-extension://*
// @include     *chrome-extension://*
// @version     1.3
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==



var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '                                                   /*\n*/body{background-color: #303030;}.tr_content {/*\n*//*\n*/    /*\n*/    background-color: #383838;/*\n*/ /*\n*/}.tv_contents {/*\n*//*\n*/  /*\n*/    background-color: #232323;/*\n*//*\n*/}.tv_content {/*\n*//*\n*/    /*\n*/    background-color: #3b3b3b;/*\n*//*\n*/}.scripttable tr, .section, .actiontable {/*\n*//*\n*/ /*\n*/    border-color: #393939;/*\n*/     background-color: #ababab;/*\n*//*\n*/}.tr_tabs_alt {/*\n*//*\n*/    background-color: #8d8d8d !important;/*\n*//*\n*/}.editor_outer {/*\n*//*\n*/    /*\n*/    background-color: #7b7b7b;/*\n*//*\n*/}.editor_border {/*\n*//*\n*/    background-color: #4b4b4b;/*\n*/    border-radius: 3px 3px 3px 3px;/*\n*/   /*\n*//*\n*/}.CodeMirror {/*\n*//*\n*/   /*\n*/    background: #adadad;/*\n*//*\n*/}                          ';
document.getElementsByTagName('head')[0].appendChild(style);



