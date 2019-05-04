// ==UserScript==
// @name         Munzee Map Remove Alert
// @namespace    MOBlox
// @version      1.0
// @description  Remove Message on Munzee Map.
// @author       MOBlox
// @match        https://www.munzee.com/map
// @grant        none
// ==/UserScript==
$('div.alert:contains(Dear Munzee players)').hide();