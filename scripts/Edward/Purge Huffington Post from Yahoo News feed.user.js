// ==UserScript==
// @name       Purge Huffington Post from Yahoo News feed
// @version    1.3
// @namespace  edward
// @author	   Edward
// @description  Eliminates Huffington Post Entries from Yahoo News list. Will run through iterative cycles to continue cleaning up the page as more are loaded.
// @include		 http*://*.yahoo.*/*
// @grant          unsafeWindow
// ==/UserScript==


setInterval(removeSpam, 2000);
function removeSpam() {
var spanTags = document.getElementsByTagName('span');
var spamNames = ['Huffington Post', 'The Huffington Post', 'ThinkProgress', 'Vox'];
var found;
for (var i = 0; i < spanTags.length; i++) {
  if (contains(spamNames, spanTags[i].textContent)) {
    found = spanTags[i];
    parentBlock = getParent(getParent(getParent(getParent(found))));
    removeAllChildren(parentBlock);
  }
}
}
function getParent(o) {
return o.parentNode;
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
function removeAllChildren(o) {
	while (o.firstChild) {
  o.removeChild(o.firstChild);
}
	
}
