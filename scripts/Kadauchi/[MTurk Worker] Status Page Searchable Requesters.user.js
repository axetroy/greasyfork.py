// ==UserScript==
// @name         [MTurk Worker] Status Page Searchable Requesters
// @namespace    https://github.com/Kadauchi
// @version      1.0.1
// @description  Turns the requester name into a link that searches for their HITs on status detail pages
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://worker.mturk.com/status_details/*
// ==/UserScript==

(() => {
    for (const row of document.getElementsByClassName(`desktop-row`)) {
        const requesterId = new URLSearchParams(row.getElementsByTagName(`a`)[1].href).get(`requester_id`);

        const requesterName = row.getElementsByClassName(`fa-plus-circle`)[0].parentElement.nextElementSibling;

        const requesterSearch = document.createElement(`a`);
        requesterSearch.href = `https://worker.mturk.com/requesters/${requesterId}/projects`;
        requesterSearch.target = `_blank`;
        requesterSearch.textContent = requesterName.textContent;

        requesterName.parentNode.replaceChild(requesterSearch, requesterName);
    }
})();

