// ==UserScript==
// @name         New/Last Threadmark
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.3
// @license      MIT
// @description  Add a link to New/Last threadmark right after threadmark menu. Highlight new post notification if there is a new threadmark.
// @author       Vannius
// @match        https://www.alternatehistory.com/forum/threads/*
// @match        https://forums.spacebattles.com/threads/*
// ==/UserScript==

(function () {
    // return if there isn't threadmark
    const threadmarkMenuTags = document.getElementsByClassName('threadmarkMenus');
    if (threadmarkMenuTags.length === 0) return;

    // settings for each site
    const threadmarkSetting = {};
    const newTagSetting = {};
    if (window.location.host === "www.alternatehistory.com") {
        threadmarkSetting.id = 'XenForoUniq1';
        threadmarkSetting.style = {};
        threadmarkSetting.style.backgroundColor = "rgb(249, 249, 249)";
        threadmarkSetting.style.display = "inline-block";
        threadmarkSetting.style.padding = "3px 5px";
        newTagSetting.class = 'messageBarNew';
        newTagSetting.style = {};
        newTagSetting.style.color = '#e03030';
    } else if (window.location.host === "forums.spacebattles.com") {
        threadmarkSetting.id = 'XenForoUniq1';
        threadmarkSetting.style = {};
        threadmarkSetting.style.display = "inline-block";
        threadmarkSetting.style.padding = "3px 5px";
        newTagSetting.class = 'newIndicator';
        newTagSetting.style = {};
        newTagSetting.style.color = "#e03030";
        newTagSetting.style.fontWeight = 'bold';
    }

    // detect new threadmark
    const threadmarkJSMenuTag = document.getElementById(threadmarkSetting.id);
    const threadmarkLinkTags = threadmarkJSMenuTag.getElementsByTagName('a');
    const newIndicatorTags = threadmarkJSMenuTag.getElementsByClassName('newIndicator');

    const addHref = newIndicatorTags.length === 0
        ? threadmarkLinkTags[threadmarkLinkTags.length - 1].href
        : newIndicatorTags[0].nextElementSibling.href;
    const addText = newIndicatorTags.length === 0 ? "Last Threadmark" : "New Threadmark";

    // make New/Last link
    const addLink = document.createElement('a');
    addLink.href = addHref;
    addLink.appendChild(document.createTextNode(addText));
    Object.assign(addLink.style, threadmarkSetting.style);

    const addDiv = document.createElement('div');
    addDiv.appendChild(addLink);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(document.createTextNode("\n"));
    fragment.appendChild(addDiv);
    fragment.appendChild(document.createTextNode("\n"));

    // add a link to New/Last Threadmark after threadmarkMenuTags
    threadmarkMenuTags[0].appendChild(fragment.cloneNode(true));
    threadmarkMenuTags[1].appendChild(fragment);

    // change color of new post notification if there is a new threadmark
    if (newIndicatorTags.length) {
        const messageListTag = document.getElementsByClassName('messageList')[0];
        const newTags = messageListTag.getElementsByClassName(newTagSetting.class);
        for (let newTag of newTags) {
            Object.assign(newTag.style, newTagSetting.style);
        }
    }
})();
