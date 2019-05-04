// ==UserScript==
// @name         GitLab Local Time
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Show local time in tooltips instead UTC
// @author       Vyacheslav Shimarulin
// @match        https://gitlab.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function gitlabTime() {
        const timeElementList = Array.from(document.getElementsByTagName('time'));
        timeElementList.forEach(function(elem) {
            const time = new Date(elem.getAttribute('datetime'))
            .toLocaleString();

            elem.setAttribute('data-original-title', time)
        });
    }

    setTimeout(() => {
        gitlabTime();
    }, 2000)
})();