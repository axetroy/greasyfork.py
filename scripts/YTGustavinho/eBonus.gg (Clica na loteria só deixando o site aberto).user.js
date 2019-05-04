// ==UserScript==
// @name         eBonus.gg (Clica na loteria só deixando o site aberto)
// @namespace    https://ebonus.gg/
// @version      1.1
// @description  Clique automatico na loteria do stream.
// @author       YTGustavinho
// @license      No license
// @match        https://ebonus.gg/earn-coins/stream
// @grant        none
// ==/UserScript==

setInterval(click, 70000);

function click()
{
 $("#join-lotto-btn.button.button-desc.button-3d.button-rounded.btn-block.center.fright").click();
}