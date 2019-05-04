// ==UserScript==
// @name           Disable keyboard shortcuts DEV
// @description    Stop websites from highjacking keyboard shortcuts
//
// @run-at         document-start
// @include        *
// @grant          none
// @inject-into    content
// @version        2018.12.07.1433
// @namespace      https://greasyfork.org/users/30
// ==/UserScript==

//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
const keyValues = new Set(['/','Escape']); // Check on https://keycode.info/

const preventKey = function(e){
    if (keyValues.has(e.key)){
        e.stopImmediatePropagation(); 
    }
    //console.log('Event: type: %s, key: %s, has: %s', e.type, e.key, keyValues.has(e.key));
}

document.addEventListener('keydown', preventKey, {passive: false}); // Slash search on https://github.com/
document.addEventListener('keypress', preventKey, {passive: false}); // Slash search on https://forum.manjaro.org/
//document.addEventListener('keyup', preventKey); // I need to find test case
