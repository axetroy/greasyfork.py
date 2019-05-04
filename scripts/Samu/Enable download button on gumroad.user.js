// ==UserScript==
// @name         Enable download button on gumroad
// @namespace    DisableGumroadRegionLock
// @version      0.1
// @description  Disable gumroad.com Region Lock
// @author       Samu
// @match        https://gumroad.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle(".i-want-this-container { display: block !important; }");
})();