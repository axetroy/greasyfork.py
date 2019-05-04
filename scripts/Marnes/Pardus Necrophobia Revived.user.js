// ==UserScript==
// @name        Pardus Necrophobia Revived
// @namespace   marnick.leau@gmail.com
// @description Returns you to the Nav after killing a monster.
// @include     http://*.pardus.at/ship2opponent_combat.php?opponentid=*
// @include     https://*.pardus.at/ship2opponent_combat.php?opponentid=*
// @version     1.2
// @grant       none
// ==/UserScript==

/*	const path = "//table[1]/tbody/tr[2]/td[2]/table[1]/tbody/tr[1]/td[2]/b[text()='D E A D']";
const node = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (node) location.pathname = "/main.php";	*/

const path = "body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(13) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > b:nth-child(5)";
const node = document.querySelector(path);
if (node && node.textContent == "D E A D") location.pathname = "/main.php";