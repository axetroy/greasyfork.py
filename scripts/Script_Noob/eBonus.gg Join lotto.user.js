// ==UserScript==
// @name         eBonus.gg Join lotto
// @namespace    https://ebonus.gg/
// @version      1.1
// @description  Auto clicks on Enter in the lotto on the stream.
// @author       Julia
// @license      No license
// @match        https://ebonus.gg/earn-coins/stream
// @grant        none
// ==/UserScript==

setInterval(click, 70000);

function click()
{
 $("#join-lotto-btn.button.button-desc.button-3d.button-rounded.btn-block.center.fright").click();
}
