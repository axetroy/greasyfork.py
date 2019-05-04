// ==UserScript==
// @name         Facebook no ads
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Makes sponsored feeds invisible on facebook.com
// @author       Darmikon
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const doHack = (feed) => {
    const title = feed
      .querySelector('[data-testid*="story"]');

    const link = title.querySelector('a');

    // trigger mouseover to check if generated href contains ads inside
    if(link) {
      const mouseoverEvent = new Event('mouseover');
      link.dispatchEvent(mouseoverEvent);
      if(link.href && link.href.contains('ads')) {
         const mouseoutEvent = new Event('mouseout');
         link.dispatchEvent(mouseoutEvent);
         return true;
      }
    }
}

const trimAds = () => {
    const feeds = document.getElementById('contentArea').querySelectorAll('[id*=hyperfeed_story_id]');
    feeds.forEach(feed => {
        try {
          if(doHack(feed)) {
            // console.log('killed', title);
            feed.style.display = "none";
          }
        } catch (e) {}
    });
}

(function() {
    const throttleKill = throttle(trimAds, 50);
    throttleKill();
    window.addEventListener('scroll', throttleKill);
    window.addEventListener('resize', throttleKill);
})();