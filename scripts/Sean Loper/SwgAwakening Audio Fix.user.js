// ==UserScript==
// @name         SwgAwakening Audio Fix
// @namespace    http://swgawakening.com/
// @version      0.1
// @description  For those of us who think it's loud and obstructs our netflix just to monitor server uptime.
// @author       ThisGuy
// @match        http://swgawakening.com/portal.php
// @grant        none
// ==/UserScript==

// This is pretty obvious and simple as anyone who understands the website uses Jquery as it's front-end. Just doing some simple cleanup.
$( "audio" ).remove();