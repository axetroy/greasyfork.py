// ==UserScript==
// @name          The TVDB English only search results
// @include       http://www.thetvdb.com/*?string=*
// @include       http://thetvdb.com/*?string=*
// @description   List only English language titles in The TVDB search results
// @version       1.0.2
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @license       MIT License
// @grant         none
// @run-at        document-start
// @require       https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==

setMutationHandler(document, '#listtable tr', function(nodes) {
  for (var i=nodes.length-1, n; i>=0 && (n=nodes[i]); i--)
    if (n.children[1].textContent != 'English')
      n.remove();
  return true;
});
