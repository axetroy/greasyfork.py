// ==UserScript==
// @name         Clearer CFN Doc Titles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes "AWS" from the title bar to make it easier to identify multiple tabs of CloudFormation documentation
// @author       Walt Whiteside
// @match        https://docs.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.title = document.title.replace('AWS', '').replace(/^:+|:+$/g, "");
})();