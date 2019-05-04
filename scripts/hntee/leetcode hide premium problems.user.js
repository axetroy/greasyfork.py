// ==UserScript==
// @name         leetcode hide premium problems
// @description:en Hide Premium Problems on Leetcode
// @namespace    https://greasyfork.org/en/users/22079-hntee
// @version      0.4
// @author       hntee
// @match        https://leetcode.com/*
// @description Hide Premium Problems on Leetcode
// ==/UserScript==


(function() {
    'use strict';
    observeDomChange();
})();

function observeDomChange() {
    var MutationObserver = window.MutationObserver;
    var myObserver       = new MutationObserver (mutationHandler);
    var obsConfig        = {
        childList: true, attributes: true,
        subtree: true,   attributeFilter: ['list-group']
    };
    myObserver.observe (document, obsConfig);
    function mutationHandler (mutationRecords) {
        $('.fa-lock').parent().parent().parent().hide();
    }
}