// ==UserScript==
// @name 		Alex:BTSC : reformat DocInformation block for easy copy paste
// @namespace	http://btsc.webapps.blackberry.com/
// @description	BTSC:reformat DocInformation block for easy copy paste
// @include		http://btsc.webapps.blackberry.com/btsc/viewdocument.do?*
// @version 0.0.1.20150819230328
// ==/UserScript==

function fetchAndRemove() {
	var nodesSnapshot = document.evaluate(
		  '//div[@class="social"]'
		, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
	);

	var nbrDivs = nodesSnapshot.snapshotLength;
	if (0!=nbrDivs) {
		for ( var i=0 ; i < nbrDivs ; i++ )
			nodesSnapshot.snapshotItem(i).parentNode.removeChild(nodesSnapshot.snapshotItem(i));
	} // end if
} // end function fetchAndRemove()

window.xdx = function() {
  fetchAndRemove();
}

xdx();

