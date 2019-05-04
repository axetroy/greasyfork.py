// ==UserScript==
// @name         Roll20 Boilerplate v2
// @namespace    http://statonions.com
// @version      0.2.1
// @description  Use this before other scripts
// @author       Justice Noon
// @match        https://app.roll20.net/editor/
// @include      https://app.roll20.net/assets/*
// @run-at       document-start
// @grant        GM_webRequest
// @webRequest   {"selector": "*/assets/app.js?*", "action": "cancel" }
// ==/UserScript==

(function() {
    'use strict';
    var readyScript = '';

    GM_webRequest([{"selector": "*/assets/app.js?*", "action": "cancel" }], function(info, message, details) {
        console.log(info, message, details);
    });
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function() {readyScript = this.responseText.replace('getPointer,degreesToRadians;', 'getPointer,degreesToRadians;window.d21=d20;')});
    oReq.open("GET", "https://app.roll20.net/assets/app.js");
    oReq.send();

    const observer = new MutationObserver(mutations => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach(node => {
                if(node.nodeType === 1 && node.tagName === 'SCRIPT') {
                    const src = node.src || '';
                    //Load modified app when it would have loaded normally
                    if(src.indexOf('assets/app.js') > -1) {
                        window.eval(readyScript);
                        node.type = 'javascript/blocked';
                        node.parentElement.removeChild(node);
                        observer.disconnect();
                    }
                }
            })
        })
    })

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    })
})();