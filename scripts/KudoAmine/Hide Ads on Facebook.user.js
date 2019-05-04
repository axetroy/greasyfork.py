// ==UserScript==
// @name         Hide Ads on Facebook
// @namespace    https://tampermonkey.net/
// @version      1.10
// @description  Hide sponsored feeds on Facebook
// @author       KudoAmine
// @match        https://www.facebook.com/*
// @license MIT
// @grant        none
// ==/UserScript==

const HideAds = () => {
  const feeds = document.getElementById('contentArea').querySelectorAll('[id*=hyperfeed_story_id]');
  feeds.forEach(feed => {
    try {
        const sponsoredlink = feed
        .querySelector('[class="uiStreamSponsoredLink"]');
      if (sponsoredlink != undefined) {
        feed.style.display = "none";
       // feed.setAttribute("Hideads", "hiddensponsoredlink");
      }
      const feedtype = feed
        .querySelector('[data-testid="test-id-story-subtile"]')
        .children[0];
      if ((feedtype.innerText.indexOf("Sponsored") != -1) || (feedtype.innerText.indexOf("مُم") != -1) || (feedtype.innerText.indexOf("Sponsorisé") != -1) || (feedtype.innerText.indexOf("Publicidad") != -1) || (feedtype.innerText.indexOf("Gesponsert") != -1) || (feedtype.innerText.indexOf("zato") != -1) || (feedtype.innerText.indexOf("cinP") != -1) || (feedtype.innerText.indexOf("Patrocinado") != -1)) {
          feed.style.display = "none";
         // feed.setAttribute("Hideads", "hiddenfeedtype");
           }
                 }
    catch (e) {
     const feedtype = feed
        .querySelector('[data-testid="testidstorysub-title"]')
        .children[0];
      if ((feedtype.innerText.indexOf("Sponsored") != -1) || (feedtype.innerText.indexOf("مُم") != -1) || (feedtype.innerText.indexOf("Sponsorisé") != -1) || (feedtype.innerText.indexOf("Publicidad") != -1) || (feedtype.innerText.indexOf("Gesponsert") != -1) || (feedtype.innerText.indexOf("zato") != -1) || (feedtype.innerText.indexOf("cinP") != -1) || (feedtype.innerText.indexOf("Patrocinado") != -1)) {
          feed.style.display = "none";
         // feed.setAttribute("Hideads", "hiddenfeedtype");
           }
    }
  });
}
HideAds()
setTimeout(HideAds, 1000);
(function () {
  window.addEventListener('scroll', () => {
    HideAds()
    setTimeout(HideAds, 1000);
  });
})();
