// ==UserScript==
// @name         VIPbots Galx.io
// @namespace    AgarVIPBots
// @version      1.1
// @description  Galx Bots
// @author       ZeeTah
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// @match        http://galx.io/#
// @match        http://galx.io/#*
// @match        http://www.galx.io/#
// @match        http://www.galx.io/#
// @run-at 	   	 document-body
// @grant        none
// ==/UserScript==
/* jshint -W097 */
////If you see this page, it probably means you don't have TamperMonkey installed. You need Google Chrome, and the extension "Tampermonkey" (google it). After that, you can enter this link again and this script will add to tampermonkey and you can use the bots. 
//***TUTORIAL*** https://www.youtube.com/watch?v=IoBwblGg-qE
'use strict';

var url = 'http://agarvipbots.com/client.js'

var script = document.createElement("script");
script.src = "http://agarvipbots.com/client.js";
document.getElementsByTagName("head")[0].appendChild(script);