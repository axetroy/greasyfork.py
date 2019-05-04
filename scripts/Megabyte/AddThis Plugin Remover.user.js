// ==UserScript==
// @name        AddThis Plugin Remover 
// @namespace   MegaByteATR
// @description A script which removes the AddThis plugin.
// @require https://greasyfork.org/scripts/21713-remover/code/Remover.js?version=138250
// @run-at      document-start
// @include     *
// @version     2
// @grant       none
// ==/UserScript==


 
    remove("[src*=addthis]");