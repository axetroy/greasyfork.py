// ==UserScript==
// @name            xkcd 1418
// @name:ru         xkcd 1418
// @namespace       http://xkcd.com/1418
// @description     replaces the word "force" with "horse" everywhere,
//                  is expandable with other replacements
// @description:ru  заменяет слово "force" на "horse",
//                  можно добавлять свои замены
// @version         1.2
// @include         *
// @grant           none
// ==/UserScript==

// based on http://bitcoinshell.mooo.com/users/noiob/dev/horse.user.js

var replacements = [
    ['Force', 'Horse'], ['FORCE', 'HORSE'], ['force', 'horse']
    // add your own replacements here (e.g. ['the cloud', 'my butt']).
    // don't forget to add commas to the list
    // ru:можно добавлять свои замены здесь, например, ['the cloud', 'my butt']
    // ru:не забывайте добавить запятые к списку
];

textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
function xkcd_replace(source, replace) {
  var searchRE = new RegExp(source, 'g');
  for (var i = 0; i < textNodes.snapshotLength; i++) {
    var node = textNodes.snapshotItem(i);
    node.data = node.data.replace(searchRE, replace);
  }  
}
arrayLength = replacements.length;
for (var i = 0; i < arrayLength; ++i) {
    xkcd_replace(replacements[i][0], replacements[i][1]);
}
