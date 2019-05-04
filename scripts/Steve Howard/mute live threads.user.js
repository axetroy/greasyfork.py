// ==UserScript==
// @name        mute live threads
// @namespace   org.stevenhoward
// @description Adds a button to remove live threads
// @include     https://www.reddit.com/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

const selector = 'a.happening-now-wrap';

function onBannerInserted(root) {
  const liveBanner = root.querySelector(selector);
  const muted = JSON.parse(localStorage.mutedLiveThreads || '[]');

  if (!liveBanner) {
    return;
  }

  function hideBanner() {
    liveBanner.style.display = "none";
  }

  function onClose(e) {
    e.preventDefault();
    localStorage.mutedLiveThreads = JSON.stringify(muted.concat([ liveBanner.href ]));
    hideBanner();
  }

  if (muted.includes(liveBanner.href)) {
    hideBanner();
  }
  else {
    const close = document.createElement('p');
    close.innerHTML = '[X]';
    close.style.float = 'right';
    close.addEventListener('click', onClose, true);

    liveBanner.querySelector('.happening-now').appendChild(close);
  }
}

new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.querySelector && node.querySelector(selector)) {
        onBannerInserted(node);
      }
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener('DOMContentLoaded', () => onBannerInserted(document.body));
