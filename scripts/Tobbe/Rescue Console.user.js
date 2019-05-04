// ==UserScript==
// @name			Rescue Console
// @description		Rescues the console at website refresh to prevent overwriting by the website.
// @namespace		RescueConsole
// @author			Tobbe
// @version			1.1
//
// @include			*
//
// @run-at			document-start
//
// @grant			none
// ==/UserScript==

// Store the console to window.debugConsole to prevent overwriting by the website.
try {
    window.wrappedJSObject.debugConsole = window.console;
} catch(e) {
    window.debugConsole = window.console;
}