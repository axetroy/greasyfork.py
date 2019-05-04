// ==UserScript==
// @name Monospace Keyboard Shortcut for Confluence
// @version 0.1
// @description Adds a new keyboard shortcut (Ctrl+Alt+S) for monospace formatting
// @match https://*/wiki/pages/editpage.action*
// @match https://*/wiki/pages/createpage.action*
// @grant none
// @namespace https://greasyfork.org/users/10099
// ==/UserScript==

tinymce.activeEditor.addShortcut("ctrl+alt+s","monospace","confMonospace");