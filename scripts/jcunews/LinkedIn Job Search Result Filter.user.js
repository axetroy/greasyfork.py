// ==UserScript==
// @name         LinkedIn Job Search Result Filter
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @version      1.0.1
// @license      GNU AGPLv3
// @author       jcunews
// @description  Filter out LinkedIn job search result by title, company, location or domain. Edit filter list in the script before use, and keep a backup before updating script.
// @match        *://www.linkedin.com/*
// @grant        none
// ==/UserScript==

((titleFilter, companyFilter, locationFilter, domainFilter) => {

  //===== CONFIGURATION BEGIN =====

  titleFilter    = /badpost|badjob/i;
  companyFilter  = /badcompany|badcorp/i;
  locationFilter = /badcity|badcity, ch|, ch|/i;
  domainFilter   = /unwanted\.com|meh\.net/i;

  //===== CONFIGURATION END =====

  (new MutationObserver(rs => {
    rs.forEach(r => {
      r.addedNodes.forEach(n => {
        if (n.nodeType !== Node.ELEMENT_NODE) continue;
        document.querySelectorAll("li.artdeco-list__item").forEach((li, a) => {
          if (
            ((a = li.querySelector(".job-card-search__title")) && titleFilter.test(a.textContent)) ||
            ((a = li.querySelector(".job-card-search__company-name")) && companyFilter.test(a.textContent)) ||
            ((a = li.querySelector(".job-card-search__location")) && locationFilter.test(a.textContent)) ||
            ((a = li.querySelector(".job-card-search__source-domain")) && domainFilter.test(a.textContent))
          ) li.remove();
        });
      });
    });
  })).observe(document.body, {childList: true, subtree: true});
})();
