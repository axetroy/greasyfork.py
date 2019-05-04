// ==UserScript==
// @name       PhysicsOvermail
// @version    2.2
// @description Toggles the "Email me" box value below each post in the edit window
// @match      http://www.physicsoverflow.org/*
// @match      http://physicsoverflow.org/*
// @cchrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/layout/default/images/filesave.pngopyright  WTFPL, http://wtfpl.net 
// @namespace https://greasyfork.org/users/2311
// ==/UserScript==
var po-q-notifier = document.getElementsByName("q_notify");
var po-a-notifier = document.getElementsByName("a_notify");
$(po-q-notifier).click();
$(po-a-notifier).click();