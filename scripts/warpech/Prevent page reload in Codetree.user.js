// ==UserScript==
// @name         Prevent page reload in Codetree
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prevent automatic page reload in Codetree, which happens when manually sorting Milestones. This makes it much faster to apply sorting to the Milestones.
// @author       Marcin Warpechowski
// @match        https://codetree.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(document).off("uiPageRefreshRequested");

})();