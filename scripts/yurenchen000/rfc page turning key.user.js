// ==UserScript==
// @name         rfc page turning key
// @namespace    http://note.yurenchen.com/archives/js_snippets.html
// @version      0.1
// @description  rfc page turning key: ← →
// @author       yurenchen
// @match        https://tools.ietf.org/html/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //rfc page turning key: ← →
    var pages = document.getElementsByClassName('newpage');
    var page_height = pages[1].offsetTop-pages[0].offsetTop;
    console.log('page_height"', page_height);
    function nextpage(){
        document.body.scrollTop += page_height;
    }
    function prevpage(){
        document.body.scrollTop -= page_height;
    }
    document.body.onkeydown = function(e){
        console.log('onkeydown:',e);
        switch(e.key){
        case 'ArrowRight':
            nextpage();
            break;
        case 'ArrowLeft':
            prevpage();
            break;
        }
    };

})();