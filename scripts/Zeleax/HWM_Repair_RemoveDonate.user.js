// ==UserScript==
// @name        HWM_Repair_RemoveDonate
// @namespace   Zeleax
// @description Удаляет из кузни опцию ремонта арта за бриллианты
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(mod_workbench.php.*)/
// @version     1.1
// @grant       none
// ==/UserScript==

el = getI( "//a[contains(@onclick, 'mod_workbench_sweet_confirm_repair')]" );
if (el.snapshotLength > 0) el.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode.remove();

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
