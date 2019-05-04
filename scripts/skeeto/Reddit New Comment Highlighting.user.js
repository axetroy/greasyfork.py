// ==UserScript==
// @name         Reddit New Comment Highlighting
// @description  A free Gold feature
// @version      1.0.0
// @namespace    skeeto
// @license      Public Domain
// @include      http*://*.reddit.com/*
// @grant        none
// ==/UserScript==

var HLN = HLN || {};

HLN.highlight = function(cutoff) {
    $('.entry').each(function() {
        var date = new Date($(this).find('time').attr('datetime')).getTime();
        if (date > cutoff) {
            $(this).addClass('new-comment');
        } else {
            $(this).removeClass('new-comment');
        }
    });
};

HLN.subreddit = function() {
    var match = /\/comments\/([a-z0-9]{6,})/.exec(window.location);
    return match != null ? match[1] : null;
};

HLN.lastvisit = function() {
    var subreddit = HLN.subreddit();
    if (subreddit != null) {
        var last = window.localStorage[subreddit + '-lastvisit'];
        if (last != null) {
            return parseFloat(last);
        } else {
            return null;
        }
    } else {
        return null;
    }
};

HLN.mark = function(time) {
    var subreddit = HLN.subreddit();
    if (subreddit != null) {
        return window.localStorage[subreddit + '-lastvisit']
            = time || Date.now();
    } else {
        return null;
    }
};

HLN.run = function() {
    var last = HLN.lastvisit();
    if (last) {
        HLN.highlight(last);
    }
    HLN.mark();
};

HLN.run();
