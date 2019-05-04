// ==UserScript==
// @name        SJW to Skeleton
// @namespace   http://fempire.org
// @description Expose the spookiarchy
// @version     2
// @grant       none
// ==/UserScript==

function replaceSkeletons(obj, attr)
{
  // Replace text data.
  var text = obj[attr], old = text;
  text = text.replace(/\bsjw\b/ig, 'skeleton');
  text = text.replace(/\bsjws\b/ig, 'skeletons');
  text = text.replace(/\bsocial justice warrior\b/ig, 'skeleton');
  text = text.replace(/\bsocial justice warriors\b/ig, 'skeletons');
  text = text.replace(/\b(a)n skeleton(s?)\b/ig, '$1 skeleton$2');
  if (text !== old) obj[attr] = text;
}

// Get all text nodes.
var textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textNodes.snapshotLength; i++) {
  var node = textNodes.snapshotItem(i);
  replaceSkeletons(node, 'data');
}