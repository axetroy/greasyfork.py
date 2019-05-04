// ==UserScript==
// @name        Subdue Metafilter Titles
// @namespace   http://example.com/SubdueMetafilterTitles
// @description Makes titles on the Metafilter front page smaller, and moves them to the "posted by" line.
// @include     http://www.metafilter.com/
// @include     http://www.metafilter.com/*?page=*
// @include     http://ask.metafilter.com/
// @include     http://ask.metafilter.com/*?page=*
// @include     http://metatalk.metafilter.com/
// @include     http://metatalk.metafilter.com/*?page=*
// @version     1
// ==/UserScript==

var posttitleDivSnap = document.evaluate(
	"//div[contains(concat(' ', @class, ' '), ' posttitle ')]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < posttitleDivSnap.snapshotLength; i++) {
	var posttitleDiv = posttitleDivSnap.snapshotItem(i);

    var posttitleLinkSnap = document.evaluate("a", posttitleDiv,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (posttitleLinkSnap.snapshotLength != 1) {
        continue;
    }
    var posttitleLink = posttitleLinkSnap.snapshotItem(0);
    var metafilterIndex = posttitleLink.href.indexOf("metafilter.com");
    if (metafilterIndex < 0) {
        continue;
    }
    var relativeLink = posttitleLink.href.substring(metafilterIndex + 14);
    

    var smallcopyLinksToSameSnap = document.evaluate(
        "//span[contains(concat(' ', @class, ' '), ' smallcopy ')]" +
        "//a[@href='" + relativeLink + "']",
        document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var j = 0; j < smallcopyLinksToSameSnap.snapshotLength; ++j) {
        var smallcopyLinkToSame = smallcopyLinksToSameSnap.snapshotItem(j);
        var parentSpan = smallcopyLinkToSame.parentNode;
        if (parentSpan.innerHTML.indexOf("posted by") == 0) {
            parentSpan.innerHTML = "<em>" + posttitleLink.innerHTML + "</em>" +
                "<br/>" + parentSpan.innerHTML;
            posttitleDiv.parentNode.removeChild(posttitleDiv);
            break;
        }
    }
}
