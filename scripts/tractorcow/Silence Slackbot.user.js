// ==UserScript==
// @name         Silence Slackbot
// @namespace    https://github.com/tractorcow/silence-slackbot
// @version      1.0.0
// @description  Silence SlackBot
// @author       tractorcow
// @match        https://*.slack.com/*
// @grant        none
// ==/UserScript==


if(document.body && $) {
    $("#msgs_div").on('DOMSubtreeModified propertychange', function() {
        $(".message[data-member-id='USLACKBOT']").hide();
    });
}
