// ==UserScript==
// @name         Auto Bump Disboard
// @namespace    http://blockbuster.xp3.biz/
// @version      0.1
// @description  Not against ToS!
// @author       You
// @match        https://disboard.org/dashboard/servers
// @grant        none
// ==/UserScript==

// REPLACE THE 000000000000000000 WITH YOUR SERVER ID:
var ID = "000000000000000000";

setTimeout(function(){window.location.href = "https://disboard.org/server/bump/" + ID;}, 600000);