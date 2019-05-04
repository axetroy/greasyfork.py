// ==UserScript==
// @name           Worker Site Async (Nonblocking) CSS
// @namespace      salembeats
// @version        1.1
// @description    Trying to make Worker actionable faster.
// @author         Cuyler Stuwe (salembeats)
// @include        https://worker.mturk.com/*
// @exclude        https://worker.mturk.com/overwatch
// @grant          none
// ==/UserScript==

document.querySelectorAll("link").forEach(el => document.body.appendChild(el));