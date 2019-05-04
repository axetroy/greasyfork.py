// ==UserScript==
// @name         Bye bye bing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  makes it so you can't search bing
// @author       Tim Spark
// @match        https://www.bing.com/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

jQuery('#sb_form_q').remove()
jQuery('#sb_form_go').remove()
jQuery('.sw_sform').remove()