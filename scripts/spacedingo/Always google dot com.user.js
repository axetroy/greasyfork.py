// ==UserScript==
// @name        Always google dot com
// @description Find and replace Google DOT Country-TLD to Google DOT com
// @namespace   https://greasyfork.org/en/users/2871-spacedingo
// @version     1.08
// @include     /^https:\/\/\w+\.google\.(?!com\/).*/
// @exclude     */_/chrome/newtab*
// @grant       none
// @run-at      document-start
// ==/UserScript==
window.location.replace(window.location.toString().replace(/^(https:\/\/\w+\.google\.).*?(\/.*)/, "$1com$2"));