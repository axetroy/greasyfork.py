// ==UserScript==
// @name 		(Test):BTSC : reformat KB title for easy copy paste
// @namespace	http://btsc.webapps.blackberry.com/
// @description	(test)BTSC:reformat KB title for easy copy paste
// @include		http://support.blackberry.com/kb/articleDetail?ArticleNumber=*
// @version 0.0.1.20150819231217
// ==/UserScript==

function fetchAndRemove() {
	var nodesSnapshot = document.evaluate(
		  '//h1[@class="article-detail-title"]'
		, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
	);

var searchRE = new RegExp(nodesSnapshot.snapshotItem(i),'gi');
var replace = 'replaced';
for (var i=0;i<nodesSnapshot.snapshotLength;i++) {
var node = nodesSnapshot.snapshotItem(i);
node.data = node.data.replace(searchRE, replace); 

} // end function fetchAndRemove()

window.xdx = function() {
  fetchAndRemove();
}

xdx();