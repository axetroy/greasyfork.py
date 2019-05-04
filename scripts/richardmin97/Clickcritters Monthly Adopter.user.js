// ==UserScript==
// @name         Clickcritters Monthly Adopter
// @namespace github.com/richardmin97/ClickCrittersScripts/
// @version      0.0.3
// @description  Adopts all Clickcritters monthlies with their default names
// @author 		 Seiryuu
// @author       Richard Min
// @match        http://*.clickcritters.com/adoptables.php*
// @grant        none
// ==/UserScript==


function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

var form;

if (form = xpath("//form[@method='post']"))
{
	form.submit();
}


if(document.body.innerHTML.indexOf("You have been awarded a ") != -1)
{
    window.location.replace("http://www.clickcritters.com/adoptables.php");
}

//todo: use jquery so this isn't so bad