// ==UserScript==
// @name         Lightshot Printsc Printscreen redirect to image
// @namespace    https://greasyfork.org/users/200700
// @version      1.0.0
// @description  Automatically redirects prntsc/printscreen lightshot screenshots to the image
// @author       SuperOP535
// @include      /^https?:\/\/prnt.sc\/\w+$/
// @grant        none
// @run-at       document-start
// ==/UserScript==

window.addEventListener('DOMContentLoaded', () => location.href = document.querySelector('meta[property="og:image"]').content);