// ==UserScript==
// @name         Pinterest - No Forced Follow
// @namespace    valacar.pinterest.no-forced-follow
// @version      0.1.0
// @description  Prevent Pinterest from forcing you to "build your following feed"
// @author       Valacar
// @include      https://*.pinterest.tld/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const DEBUGGING = 0;

  const debugLog = DEBUGGING
    ? console.debug.bind(console, "[Forced Follow]")
    : function() {};

  function isTarget(el)
  {
    if (el.tagName === "DIV" && el.attributes.length === 0) {
      debugLog("Possible target:", el);
      if (el.textContent.includes('Build your Following')) {
        debugLog("Target located:", el);
        return true;
      }
    }
    return false;
  }

  function removeFollowPeopleButtons()
  {
    document.querySelectorAll('button').forEach(btn => {
      if(btn.textContent.includes('people to follow')) {
        btn.remove();
      }
    });
  }

  function mutationCallback(mutations)
  {
    if (!document.location.pathname.includes("/following")) return;
    //mutations.forEach(mutation => {
    for (let mutation of mutations) {
      for (let added of mutation.addedNodes) {
        if (added.nodeType === Node.ELEMENT_NODE) {
          //debugLog("Mutation:", added);
          if (isTarget(added)) {
            added.remove();
            removeFollowPeopleButtons();
            document.body.style.overflow = "auto";
          }
        }
      }
    }
  }

  let observer = new MutationObserver(mutationCallback);
  observer.observe(document.body, {
    childList: true,
    subtree: false,
    attributes: false,
    attributeOldValues: false
  });

})();