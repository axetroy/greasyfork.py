// ==UserScript==
// @name         Abandon Bot
// @namespace    https://www.reddit.com/u/AbandonBot
// @version      0.1
// @description  Automatically vote STAY
// @author       /u/AbandonBot
// @match        https://www.reddit.com/robin/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

document.querySelector(".robin--vote-class--abandon").click();