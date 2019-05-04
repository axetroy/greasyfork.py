// ==UserScript==
// @name         Development Diagnostics - Shush XenForo console noise.
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe
// @include      *
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

unsafeWindow.originalConsoleGroupMethod = unsafeWindow.console.group.bind(unsafeWindow.console);

unsafeWindow.console.group=( label )=>{ if(!label.toLowerCase().includes("xenforo")) { originalConsoleGroupMethod(label); } };