// ==UserScript==
// @name         Hide Rabb.it User Toolbar
// @namespace    https://floof.me/
// @version      1.5
// @description  Adds a button allowing you to hide the user toolbar
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
    var hideCode = ".tray.screencast{display:none !important;}.tray.shown{display:none !important;}";

    button_s.innerHTML = "▲";
    button_s.setAttribute('style','position:absolute; bottom:0;left:0;color:#FFFFFF;cursor:pointer;user-select: none;');
     button_s.setAttribute('onclick',"f_toogle_toolbar()");
    button_s.setAttribute('id',"toolbar_button");

    var code_s = document.createElement('script');
    code_s.setAttribute('type','text/javascript');
    code_s.innerHTML = "var f_toggle = false;var f_button = document.getElementById('toolbar_button');var f_toolbar = document.getElementById('toolbar_hide');function f_toogle_toolbar(){f_toggle=!f_toggle;if(f_toggle){f_button.innerHTML='▼';f_toolbar.innerHTML='';} else {f_button.innerHTML='▲';f_toolbar.innerHTML='"+hideCode+"';}}";
    newStyle.setAttribute('type','text/css');
    newStyle.setAttribute('id','toolbar_hide');

    newStyle.innerHTML = hideCode;

    body.appendChild(newStyle);
    body.appendChild(button_s);
    body.appendChild(code_s);
    console.log("Hide Rabb'it User Toolbar enabled!");
    // Your code here...tray shown screencast

})();