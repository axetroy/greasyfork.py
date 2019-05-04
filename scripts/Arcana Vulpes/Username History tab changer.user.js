// ==UserScript==
// @name        Username History tab changer
// @namespace   jiggmin
// @description replaces the "username history" with a shorter phrase so it actually shows on one line
// @include     http://jiggmin.com/members/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById("usernamehistory-tab").innerHTML = "Aliases"
document.getElementById("activitystream-tab").innerHTML = "Activity"