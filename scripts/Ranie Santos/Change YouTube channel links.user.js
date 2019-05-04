// ==UserScript==
// @name         Change YouTube channel links
// @namespace    https://greasyfork.org/en/users/84694
// @version      1.0.3
// @description  _
// @author       Ranie Santos
// @include      https://www.youtube.com/*
// @grant        none
// @icon         https://youtube.com/favicon.ico
// ==/UserScript==

const runScript = () => {
    document.querySelector('#watch7-user-header')
        .querySelectorAll('a').forEach((a) => (a.href = `${a.href}/videos`));
};

document.addEventListener('readystatechange', runScript);
document.addEventListener('spfdone', runScript);