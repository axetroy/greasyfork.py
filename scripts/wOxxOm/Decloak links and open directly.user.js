// ==UserScript==
// @name          Decloak links and open directly
// @description   Open redirected/cloaked links directly
// @version       2.1.0
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @icon          https://i.imgur.com/cfmXJHv.png
// @resource      icon https://i.imgur.com/cfmXJHv.png
// @license       MIT License
// @run-at        document-start
// @grant         GM_getResourceURL
// @match         *://*/*
// ==/UserScript==

var POPUP = document.createElement('a');
POPUP.id = GM_info.script.name;
POPUP.title = 'Original link';
POPUP.style.cssText = 'all: unset;' +
  'width: 18px;' +
  'height: 18px;' +
  'background: url("' + GM_getResourceURL('icon') + '") center no-repeat;' +
  'background-size: 16px;' +
  'background-color: white;' +
  'opacity: 0;' +
  'transition: opacity .5s;' +
  'border: 1px solid #888;' +
  'border-radius: 11px;' +
  'z-index: 2147483647;' +
  'margin-left: 0;' +
  'position: absolute;'
  .replace(/;/g, '!important;');

var allLinks = document.getElementsByTagName('a');

window.addEventListener('mousedown', decloakOnClick, true);
window.addEventListener('keydown', function(e) { if (e.keyCode == 13) decloakOnClick(e) }, true);

window.addEventListener('load', function _() {
  window.removeEventListener('load', _);
  process(allLinks);
  new MutationObserver(function(mutations) {
    if (allLinks[0])
      Promise.resolve().then(() => extractLinks(mutations));
  }).observe(document.body || document, {childList: true, subtree: true});
});

function extractLinks(mutations) {
  var extracted = [];
  for (var m = 0, ml = mutations.length; m < ml; m++) {
    for (var n = 0, added = mutations[m].addedNodes, nl = added.length; n < nl; n++) {
      var node = added[n];
      if (node.localName == 'a')
        extracted.push(node);
      else if ('children' in node && node.children[0]) {
        var childLinks = node.getElementsByTagName('a');
        if (childLinks[0])
          [].push.apply(extracted, childLinks);
      }
    }
  }
  process(extracted);
}

function process(links) {
  for (var i = 0, len = links.length; i < len; i++) {
    var a = links[i];
    if (a.href.match(/^(http|ftp)/) && decloak(a))
      a.addEventListener('mouseover', onHover, true);
  }
}

function onHover(e) {
  if (onHover.element)
    onHover.element.removeEventListener('mouseout', cancelHover);
  clearTimeout(onHover.timeout);
  onHover.timeout = setTimeout(showPopup, 500, this);
  onHover.element = this;
  this.addEventListener('mouseout', cancelHover);
}

function cancelHover(e) {
  this.removeEventListener('mouseout', cancelHover);
  clearTimeout(cancelHover.timeout);
  cancelHover.timeout = setTimeout(hidePopup, 500, this);
}

function showPopup(a) {
  if (!a.parentElement || !a.matches(':hover'))
    return;
  var linkStyle = getComputedStyle(a);
  POPUP.href = a.hrefUndecloaked;
  POPUP.style.opacity = '0';
  POPUP.style.marginLeft = -(
    (parseFloat(linkStyle.paddingRight) || 0) +
    (parseFloat(linkStyle.marginRight) || 0) +
    (parseFloat(linkStyle.borderRightWidth) || 0) +
    Math.max(0, a.getBoundingClientRect().right + 32 - innerWidth)
  ) + 'px';
  setTimeout(function() { POPUP.style.opacity = '1' }, 0);
  a.parentElement.insertBefore(POPUP, a.nextSibling);
  POPUP.addEventListener('click', openOriginal);
}

function hidePopup(a) {
  if (POPUP.matches(':hover') || onHover.element && onHover.element.matches(':hover')) {
    cancelHover.call(a);
  } else if (POPUP.style.opacity == '1') {
    POPUP.style.opacity = '0';
    cancelHover.call(a);
  } else {
    onHover.element = null;
    POPUP.remove();
  }
}

function openOriginal(e) {
  POPUP.href = '';
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  setTimeout(function() {
    onHover.element.href = onHover.element.hrefUndecloaked;
    onHover.element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
}

function decloak(a) {
  if (a == POPUP)
    return;

  if (/\bthis\.href\s*=[^=]/.test(a.getAttribute('onmousedown')))
    a.onmousedown = null;
  if (/\bthis\.href\s*=[^=]/.test(a.getAttribute('onclick')))
    a.onclick = null;

  var m = a.href.match(/[=?]((?:ftp|https?|s?)(?::\/\/[^+&]+|%3[Aa]%2[Ff]%2[Ff][^+&\/]+))/);
  if (!m)
    return;

  if (a.hostname == 'disqus.com' && a.pathname.startsWith('/embed/comments/'))
    return;

  var realUrl = decodeURIComponent(m[1]);
  if (/^s?:/.test(realUrl))
    realUrl = 'http' + realUrl;

  if (a.hostname == 'disq.us' && realUrl.lastIndexOf(':') != realUrl.indexOf(':'))
    realUrl = realUrl.substr(0, realUrl.lastIndexOf(':'));

  if (new URL(realUrl).hostname == a.hostname || a.href.match(/[?&=\/]\w*([Ss]ign|[Ll]og)[io]n/)) {
    console.debug('Decloak skipped: assumed a login redirection.');
    return;
  }

  a.hrefUndecloaked = a.href;
  a.href = realUrl;
  return true;
}

function decloakOnClick(e) {
  var a = e.target.closest && e.target.closest('a');
  if (!a || !a.hrefUndecloaked || !a.href.match(/^(http|ftp)/))
    return;
  decloak(a);
}
