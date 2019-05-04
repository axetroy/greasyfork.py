// ==UserScript==
// @name         Nexus Clash: Wiki Navpane Fix (Chrome)
// @namespace    http://nexusclash.com/wiki/index.php/user:xensyria
// @version      1.4
// @description  Fixes the old monobook khtml css "fix" for Chrome, which puts the wiki navigation pane below the page content.
// @match        http://nexusclash.com/wiki/index.php*
// @match        http://www.nexusclash.com/wiki/index.php*
// @grant        none
// @copyright    PD
// ==/UserScript==

for (var i = 0; i < document.styleSheets.length; i++) {      //  Cycle through all stylesheets on the wiki page
    if (document.styleSheets[i].ownerNode.textContent == '@import "/wiki/skins/monobook/KHTMLFixes.css";'){      //  Find the dodgy khtml fix
        document.styleSheets[i].disabled = true;      //  Disable it
    }
}