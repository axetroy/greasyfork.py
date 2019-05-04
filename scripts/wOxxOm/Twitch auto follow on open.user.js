// ==UserScript==
// @name          Twitch auto follow on open
// @description   Auto follow twitch channel when you open its page
// @include       http://www.twitch.tv/*
// @include       https://www.twitch.tv/*
// @version       1.2.0
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @license       MIT License
// @grant         none
// @run-at        document-start
// ==/UserScript==

{
  const follow = el => {
    el.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  };

  const mo = new MutationObserver(mutations => {
    let el;
    checkMutations:
    for (const {addedNodes} of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.getAttribute('data-a-target') === 'follow-button') {
          el = node;
          break checkMutations;
        }
        if (!node.children[0]) continue;
        el = node.querySelector('[data-a-target="follow-button"]');
        if (el) break checkMutations;
      }
    }
    if (el) {
      mo.disconnect();
      follow(el);
    }
  });

  const moTimedOut = () => mo.disconnect();
  const moOptions = {subtree: true, childList: true};

  let header;

  const fetchDoneHook = data => {
    mo.observe(header, moOptions);
    setTimeout(moTimedOut, 1000);
    return data;
  };

  const originalFetch = window.fetch;
  window.fetch = function (input, init, ...args) {
    header = document.querySelector('.channel-header');
    const hookable = header &&
      /^https:\/\/gql\.twitch\.tv/.test(input) &&
      /"operationName":"FollowButton_User"/.test(init && init.body);
    let task = originalFetch.apply(this, arguments);
    return hookable ? task.then(fetchDoneHook) : task;
  };
}
