// ==UserScript==
// @name         Trello Lowercase Labels
// @namespace    https://tendian.io/
// @version      0.1
// @description  Revert Trello labels back to normal case
// @author       Eric Tendian
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('body').append('<style type="text/css">.card-label{text-transform:unset;}</style>');
})();