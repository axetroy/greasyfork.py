// ==UserScript==
// @name         YouTube SubStart
// @version      1.1
// @namespace    ILoveCats
// @description  Makes subscriptions the default YouTube start page.
// @author       Mikael Porttila
// @match        https://www.youtube.com/
// @grant        none
// @run-at document-start
// ==/UserScript==

window.location = "https://www.youtube.com/feed/subscriptions";