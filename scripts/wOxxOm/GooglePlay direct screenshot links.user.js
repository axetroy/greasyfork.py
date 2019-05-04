// ==UserScript==
// @name          GooglePlay direct screenshot links
// @description   Shows all the screenshots without the scrollbox and adds direct links for fullsized versions
// @include       https://play.google.com/store*
// @version       1.0.7
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @license       MIT License
// @run-at        document-start
// ==/UserScript==

var style;

new MutationObserver((mutations, observer) => {
  for (var i=0, ml=mutations.length, m; (i<ml) && (m=mutations[i]); i++) {
    const node = m.target.dataset && m.target.dataset.slideablePortionHeuristicWidth
      ? m.target
      : m.addedNodes.length && m.addedNodes[0].localName === 'c-wiz' &&
        m.addedNodes[0].querySelector('[data-slideable-portion-heuristic-width]');
    if (node) requestAnimationFrame(() => explode(node));
  }
}).observe(document, {subtree:true, childList:true});

function explode(node) {
  node.outerHTML = '<div>' +
    [...node.getElementsByTagName('img')]
      .map(img =>
        img.nextElementSibling
          ? img.parentNode.outerHTML
          : `<a href="${img.src.replace(/=.*/, '=h900')}"><img src="${img.src}"></a>`) +
    '</div>';
}
