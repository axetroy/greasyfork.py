// ==UserScript==
// @name           The Blaze - Remove sponsored content
// @namespace      edzep.scripts
// @version        1.0.3
// @author         EdZep at HSX
// @description    Removes Sponsored Content panels from the main page
// @include        *theblaze.com
// @include        http://www.theblaze.com*
// @grant          GM_log
// ==/UserScript==

(function() {
    'use strict';
    
    var findSponsorPanels = document.evaluate("//article[@data-feed-type='story' and .//span[@class='feed-author' and contains(.,'Sponsor')]]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    var panelCount = findSponsorPanels.snapshotLength;
    //GM_log(panelCount);
    for(var i=0; i<panelCount; i++) {
        var target = findSponsorPanels.snapshotItem(i);
        target.parentNode.removeChild(target);
    }
    
})();