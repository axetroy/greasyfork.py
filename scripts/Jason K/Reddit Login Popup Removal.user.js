// ==UserScript==
// @name     Reddit Login Popup Removal
// @version  1
// @grant    none
// @description Removes reddit login popup for desktop users.
// @include     /^https?://www\.reddit\.com/.*$/
// @namespace https://greasyfork.org/users/171857
// ==/UserScript==
var popup = document.getElementsByClassName("desktop-onboarding-step_sign-up", "desktop-onboarding-step");
popup[0].parentElement.removeChild(popup[0]);

var splash = document.getElementsByClassName("splash-design", "splash_wrapper");
splash[0].parentElement.removeChild(splash[0]);

document.body.setAttribute("style", "overflow: auto");