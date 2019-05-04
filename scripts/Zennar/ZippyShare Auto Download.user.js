// ==UserScript==
// @name         ZippyShare Auto Download
// @namespace    https://greasyfork.org/en/users/223360
// @version      1.0.2
// @description  Auto download files from zippyshare
// @author       Zennar
// @match        *://*.zippyshare.com/*
// @grant        none
// @icon         https://zippyshare.com/images/favicon.ico
// @run-at       document-end
// ==/UserScript==

var xDL = document.getElementById('dlbutton');
if (xDL) {
   //document.location.href = xDL.href;
   xDL.click();
}
