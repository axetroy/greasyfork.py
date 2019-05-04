// ==UserScript==
// @name         Hide Facebook Ads
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove "sponsored" facebook ads
// @author       Sean Gore w/ L3o-pold
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

/* jshint esnext: true */
"use strict";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const observer = new MutationObserver(function(mutations, observer) {
    const sponsoredRegex = /[S][sponred]*/;
    mutations.filter((mutation) => mutation.target.textContent.split(sponsoredRegex).filter((match) => match === "").length >= 4).map((ad) => ad.target.remove());
});


observer.observe(document.getElementById("stream_pagelet"), {
	childList:true,
	subtree: true,
	attributes: true
});