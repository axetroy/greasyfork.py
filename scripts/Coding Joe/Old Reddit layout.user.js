// ==UserScript==
// @name         Old Reddit layout
// @namespace    OldReddit
// @version      0.1
// @description  Redirect to the Old Reddit layout
// @author       You
// @match        www.reddit.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // works, but I find this solution inelegant
    // window.location.href = window.location.href.replace("www.reddit.com","old.reddit.com");

    // find the span element containing the "Visit Old Reddit" link
    var eleVisitOldReddit = Array.from(document.querySelectorAll("span")).filter(e => e.innerText.indexOf("Visit Old Reddit") >= 0);

    if (eleVisitOldReddit.length > 0) {
        // invoke the Visit Old Reddit link
        eleVisitOldReddit[0].click();
    }
})();