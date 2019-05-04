// ==UserScript==
// @name Piriform update redirect
// @version 3.1
// @description Redirect Piriform product (CCleaner, Defraggler, Recuva, Speccy) update check pages to their respective builds pages.
// @namespace raina
// @include /^https?:\/\/www\.ccleaner\.com\/.+\/update/
// @run-at document-start
// @grant none
// ==/UserScript==
history.replaceState({}, "builds", "builds");
window.location.href = "./builds";
