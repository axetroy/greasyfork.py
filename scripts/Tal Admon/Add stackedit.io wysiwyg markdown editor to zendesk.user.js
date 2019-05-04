// ==UserScript==
// @name         Add stackedit.io wysiwyg markdown editor to zendesk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Tal Admon
// @match        https://*.zendesk.com/agent/*
// @grant        none
// ==/UserScript==

(function() {
    jQuery(document).ready(function(){
        setTimeout(function(){
            jQuery('.options').append('<body><button id="editor_link" onclick="javascript:window.open(\'https://stackedit.io/app#\',\'test\',\'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000\')">Open Editor</button><script>');
        },3000);
    });
})();