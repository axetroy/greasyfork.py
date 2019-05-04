// ==UserScript==
// @name        Prevent a tab from popping up dialogs when closing the tab
// @namespace   *
// @include     https://support.mozilla.org/en-US/questions/760727
// @version     1
// @author      unknown
// @description Prevent a tab from popping up dialogs when closing the tab.  Copied from UserScripts.org
// @grant       none
// ==/UserScript==

window.onbeforeunload=null;