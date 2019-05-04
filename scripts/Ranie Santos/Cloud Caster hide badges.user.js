// ==UserScript==
// @name         Cloud Caster hide badges
// @namespace    https://greasyfork.org/en/users/84694
// @version      1.0.1
// @description  _
// @author       Ranie Santos
// @include      http://www.cloud-caster.com/podcast
// @grant        none
// ==/UserScript==

const runScript = () => {
    document.querySelectorAll('.page-region-content .tile .brand > .badge').forEach((badge) => {
        if (badge.textContent == 0) {
            badge.style.display = 'none';
        }
    });
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
    runScript();
} else {
    document.addEventListener('DOMContentLoaded', runScript);
}
