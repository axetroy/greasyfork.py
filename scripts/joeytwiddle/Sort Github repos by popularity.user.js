// ==UserScript==
// @name         Sort Github repos by popularity
// @namespace    http://tampermonkey.net/
// @license      MIT
// @version      0.1.3
// @description  Sort user's Github repositories by popularity (only applies to those visible on the current page)
// @author       joeytwiddle
// @match        https://github.com/*tab=repositories*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  if (document.location.search.split(/[&?]/).some(x => x === "tab=repositories")) {
    // Proceed
  } else {
    // Wrong page
    return;
  }

  const container = document.querySelector('#user-repositories-list > ul');
  const reposNodeList = document.querySelectorAll('#user-repositories-list > ul > li');
  const repos = Array.prototype.slice.call(reposNodeList);

  //console.log("Repo count:", repos.length);

  repos.reverse().forEach(ul => {
    container.removeChild(ul);
  });

  repos.sort((a, b) => getPopularity(a) < getPopularity(b) ? +1 : -1);

  repos.forEach(ul => {
    container.appendChild(ul);
  });

  function getPopularity (li) {
    const starSvg = li.querySelector('[aria-label=star]');
    const textElem = starSvg && starSvg.nextSibling;
    const popularity = textElem && Number(textElem.textContent) || 0;
    //console.log("Popularity:", popularity);
    return popularity;
  }
}());
