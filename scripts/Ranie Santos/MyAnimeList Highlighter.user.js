// ==UserScript==
// @name         MyAnimeList Highlighter
// @namespace    https://greasyfork.org/en/users/84694
// @version      1.0.5
// @description  _
// @author       Ranie Santos
// @include      https://myanimelist.net/*
// @grant        none
// ==/UserScript==

const runScript = () => {
    document.querySelectorAll('.button_edit, .btn-addEdit-large:not(.notinmylist)').forEach((n) => {
        const highlightColor = '102, 255, 102';
        const tr = n.closest('tr');
        tr.style.setProperty('outline', `1px solid rgb(${highlightColor})`, 'important');
        Array.from(tr.children).forEach((td) => td.style.setProperty('background-color', `rgba(${highlightColor}, 0.1)`, 'important'));
    });
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
    runScript();
} else {
    document.addEventListener('DOMContentLoaded', runScript);
}
