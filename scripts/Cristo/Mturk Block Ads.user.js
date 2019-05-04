// ==UserScript==
// @name         Mturk Block Ads
// @description  Block the new ads on the top of mturk
// @version      0.1
// @include      https://www.mturk.com*
// @exclude      https://www.mturk.com/mturk/findquals?requestable=false&earned=true
// @author       Cristo
// @grant        GM_addStyle
// @run-at document-start
// @copyright    2012+, You
// @namespace https://greasyfork.org/users/1973
// ==/UserScript==

GM_addStyle(".message.warning:not(#alertBox) { display: none !important; }");