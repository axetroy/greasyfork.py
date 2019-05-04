// ==UserScript==
// @name         Splix.io extension (mod)
// @description  Splix.io extension (zoom, stop-button, play-with-friends)
// @version      1.3
// @author       terjanq
// @match        http://splix.io
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      splix.io
// @website      https://terjanq.github.io/splix
// @namespace https://greasyfork.org/users/57018
// ==/UserScript==

var sc = document.createElement("SCRIPT");
sc.src = "https://greasyfork.org/scripts/23106-headsplix-io/code/headSplixio.js";
document.documentElement.appendChild(sc);