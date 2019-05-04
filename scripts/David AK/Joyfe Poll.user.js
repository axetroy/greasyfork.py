// ==UserScript==
// @name         Joyfe Poll
// @namespace    joyfe
// @version      1.0
// @description  Auto vote on a poll
// @include      /^https:\/\/www\.poll-maker\.com\/(poll|results)2002822xB21B4C67-51.*$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const timeout = 5; // seconds

    if (location.pathname.includes("poll")) {
        document.querySelectorAll(".qp_i")[1].checked = true;
        document.forms[0].submit();
    }
    else {
        setTimeout(function() {
            location.href = "https://www.poll-maker.com/poll2002822xB21B4C67-51";
        }, timeout * 1000);
    }
})();