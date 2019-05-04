// ==UserScript==
// @name        I am Groot!
// @namespace   https://github.com/lzghzr/TampermonkeyJS
// @version     0.0.4
// @author      lzghzr
// @description I am Groot!!
// @match       http://*/*
// @match       https://*/*
// @require     https://greasyfork.org/scripts/372862-libreplacetext/code/libReplaceText.js?version=635456
// @license     MIT
// @grant       none
// @run-at      document-start
// ==/UserScript==
new ReplaceText([[/^[\s\S]*$/g, 'I am Groot!']], 'match');