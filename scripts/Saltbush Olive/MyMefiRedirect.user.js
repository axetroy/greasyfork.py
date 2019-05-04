// ==UserScript==
// @name         MyMefiRedirect
// @namespace    http://www.metafilter.com/user/259940
// @version      0.1.2
// @description  redirect the front page to MyMefi
// @author       saltbush and olive
// @match        https://www.metafilter.com/
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.location.href = "https://www.metafilter.com/home/mymefi";
})();