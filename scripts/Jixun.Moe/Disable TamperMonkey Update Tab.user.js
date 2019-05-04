// ==UserScript==
// @name         Disable TamperMonkey Update Tab
// @namespace    org.jixun.tamper.no.window
// @version      1.0.1
// @description  Close Tamper Monkey update window
// @author       Jixun
// @match        http://tampermonkey.net/changelog.*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

if (history.length == 1 && !document.referrer) {
    unsafeWindow.close ();
}