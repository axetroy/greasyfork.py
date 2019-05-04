// ==UserScript==
// @id           _Redirect Old Oblivion Nexus Mods Links
// @name         Redirect Old Oblivion Nexus Mods Links
// @namespace    https://greasyfork.org/en/scripts/10817-redirect-old-oblivion-nexus-mods-links
// @icon         http://www.nexusmods.com/favicon.ico
// @version      1.0
// @description  Redirects old oblivion nexus links to the proper place
// @author       TJ Lester
// @include      http://*.nexusmods.com/mods/*
// @include      http://*.nexusmods.com/users/*
// @include      http://*.tesnexus.com/mods/*
// @include      http://*.tesnexus.com/users/*
// @include      http://nexusmods.com/mods/*
// @include      http://nexusmods.com/users/*
// @include      http://tesnexus.com/mods/*
// @include      http://tesnexus.com/users/*
// @grant        none
// @run-at       document-start

// ==/UserScript==
    // This is to ensure your browsers back button still works/with high script lag
window.setTimeout(doSomething, 1000);

function doSomething()
{
    // We redirect here
    window.location.href="http://www.nexusmods.com/oblivion"+window.location.pathname;
}