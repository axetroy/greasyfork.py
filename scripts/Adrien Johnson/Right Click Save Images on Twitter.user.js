// ==UserScript==
// @name         Right Click Save Images on Twitter
// @namespace    http://adrienj.com/
// @version      0.2
// @description  Right click and save images in a Twitter gallery. Just right click in the middle. The sides to go to the prev/next image.
// @homepage     http://adrienj.com/
// @author       Adrien Johnson
// @match        https://twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle (".GalleryNav--next { width: 30%; }");
})();