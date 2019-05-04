// ==UserScript==
// @name         Development Diagnostics - Don't clear my f***ing console when I'm trying to write userscripts.
// @namespace    salembeats
// @version      1.2
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

unsafeWindow.console.newClear = unsafeWindow.console.clear.bind(window); // newClear is a new copy of the clear method.
unsafeWindow.console.clear = function() {}; // Null out the old clear method.