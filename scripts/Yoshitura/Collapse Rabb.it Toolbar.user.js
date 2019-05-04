// ==UserScript==
// @name         Collapse Rabb.it Toolbar
// @namespace    https://floof.me/
// @version      1.12
// @description  Hides the new rabb.it toolbar
// @author       Yoshitura
// @match        https://www.rabb.it/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var body = document.body;
    var newStyle = document.createElement('style');
    var button_s = document.createElement('div');
    var hideCode =  ".toolbar {display:none !important;} .content{margin-top:0 !important; height:100% !important;} .social{top:0px !important;}";

    button_s.innerHTML = "▲";
    button_s.setAttribute('style','position:absolute; top:0;right:0;color:#FFFFFF;cursor:pointer;user-select: none;');
     button_s.setAttribute('onclick',"f_toogle_toolbar()");
    button_s.setAttribute('id',"toolbar_button");

    var code_s = document.createElement('script');
    code_s.setAttribute('type','text/javascript');
    //code_s.innerHTML = "var test = 'test'";
    code_s.innerHTML = "var f_toggle = false;var f_button = document.getElementById('toolbar_button');var f_toolbar = document.getElementById('toolbar_hide');function f_toogle_toolbar(){f_toggle=!f_toggle;if(f_toggle){f_button.style.color='#000000';f_toolbar.innerHTML='';} else {f_button.style.color='#FFFFFF';f_toolbar.innerHTML='"+hideCode+"';}}";
    newStyle.setAttribute('type','text/css');
    newStyle.setAttribute('id','toolbar_hide');

    newStyle.innerHTML = hideCode;

    body.appendChild(newStyle);
     body.appendChild(button_s);
   body.appendChild(code_s);
})();