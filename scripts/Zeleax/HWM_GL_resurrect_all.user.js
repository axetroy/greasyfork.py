// ==UserScript==
// @name        HWM_GL_resurrect_all
// @namespace   Zeleax
// @description Автоматически нажимает кнопку воскрешения всей армии в Гильдии Лидеров. Предназначен для HeroesWM.ru (HWM)
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(leader_guild.php.*)/
// @version     1.0
// ==/UserScript==
var e=getE("//input[contains(@onclick,'sweet_confirm_all')]" );
if(e) e.click();

function getE(xpath,el,docObj){return (docObj?docObj:document).evaluate(xpath,(el?el:(docObj?docObj.body:document.body)),null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}
