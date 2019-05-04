// ==UserScript==//
// @name           SE Notify in title
// @description    Dynamically updates tab titles of Stack* sites with the number of inbox messages and rep change notifications
// @version        1.0.2
// @author         wOxxOm
// @namespace      wOxxOm.scripts
// @license        MIT License
// @match          *://*.stackoverflow.com/*
// @match          *://*.superuser.com/*
// @match          *://*.serverfault.com/*
// @match          *://*.askubuntu.com/*
// @match          *://*.stackapps.com/*
// @match          *://*.mathoverflow.com/*
// @match          *://*.stackexchange.com/*
// @exclude        *://blog*/*
// ==/UserScript==

'use strict';

const notificationElement = document.querySelector('.network-items, .secondary-nav, .js-secondary-topbar-links');
if (notificationElement) {
  new MutationObserver(update).observe(notificationElement, {
    subtree: true,
    attributes: true,
    childList: true,
    attributeFilter: ['style'],
  });

  update();
}

function update(mutations) {
  const msg = notificationElement.querySelector('.icon-inbox .unread-count, .js-inbox-button .js-unread-count');
  const rep = notificationElement.querySelector('.icon-achievements .unread-count, .js-achievements-button .js-unread-count');
  const title = (msg && msg.style.display !== 'none' ? msg.textContent.trim()+': ' : ' ') +
                (rep && rep.style.display !== 'none' ? rep.textContent.trim() + ' ' : '') +
                document.title.replace(/^(\d+: |\+\d+ )+/, '');
  if (document.title !== title)
    document.title = title;
}
