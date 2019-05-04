// ==UserScript==
// @name        Google Recaptcha Dark Theme Night Mode
// @namespace   english
// @description Google Recaptcha Dark Theme Night Mode - currently undergoing build
// @include     http*://*
// @version     1.3
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==



var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '                                   #rc-imageselect {/*\n*/  /*\n*/    background-color: #323232;/*\n*/}.rc-button-reload ,.rc-button-audio,.rc-button-help{/*\n*//*\n*/   /*\n*/    filter: invert(100%);/*\n*//*\n*/} #jslghtbx div,#jslghtbx div iframe{   filter: invert(100%); } #jslghtbx div div,#jslghtbx div div div,#jslghtbx div div div div,#jslghtbx div div div div div{   filter: none; }                           ';
document.getElementsByTagName('head')[0].appendChild(style);



