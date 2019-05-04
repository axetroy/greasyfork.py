// ==UserScript==
// @name           Disable keyboard shortcuts
// @description    Stop websites from highjacking keyboard shortcuts
//
// @run-at         document-start
// @include        *
// @grant          none
// @inject-into    content
// @version        0.0.1.20181203152600
// @namespace      https://greasyfork.org/users/30
// ==/UserScript==
// 
// @inject-into    content  - fixes ViolentMonkey+Firefox CSP issue

var keycodes = [191,111,27] // Keycode for '/', add more keycodes to disable other key captures
// 27  - ESC
// 111 - / on numpad
// 191 - /

document.addEventListener('keydown', function(e) {
//    alert(e.keyCode); //uncomment to find out the keycode for any given key
    if (keycodes.indexOf(e.keyCode) != -1)
    {
        e.cancelBubble = true;
        e.stopPropagation();
        e.stopImmediatePropagation();
        //return false; // hmm, I don't remember why it's needed
    }
});
