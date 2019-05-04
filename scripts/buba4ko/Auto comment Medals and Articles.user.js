// ==UserScript==
// @name         Auto comment Medals and Articles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.erepublik.com/*
// @grant        none
// ==/UserScript==

(function() {

    // vote all medal posts
    $j('h6:contains("medal")').siblings('.post_actions').children("a:contains('Vote')").click()

    // vote all comments in articles
    $j('li:contains("Vote")').click();

    // vote an opened article
    $j("div.vote_boxer a").click();

})();