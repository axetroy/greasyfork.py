// ==UserScript==
// @name         Redirection of amazon mobile links (incl. mobile offer (Marketplace)) to amazon desktop
// @namespace    ExtraFlauschig.amazon
// @version      1.1
// @description  Redirects Amazon mobile links to the desktop version (for all countrys)
// @author       ExtraFlauschig
// @include      http://www.amazon.*/gp/aw/*
// @include      http://amazon.*/gp/aw/*
// @include      https://www.amazon.*/gp/aw/*
// @include      https://amazon.*/gp/aw/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
window.location.toString().includes("/gp/aw/d/")? window.location.assign(window.location.toString().replace("/gp/aw/d/", "/dp/")) : window.location.assign(window.location.toString().replace("/gp/aw/ol/", "/gp/offer-listing/"));