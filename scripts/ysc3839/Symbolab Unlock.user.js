// ==UserScript==
// @name         Symbolab Unlock
// @namespace    https://greasyfork.org/zh-CN/users/163820-ysc3839
// @version      0.1
// @description  Unlock subscribe functions for Symbolab.
// @author       ysc3839
// @match        https://*.symbolab.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    var Solutions = function (b, g, f, a, l, e, j, h) {
        Solutions.orig_constructor.call(this, b, g, f, a, l, e, j, 'true');
    };
    Object.defineProperty(window, 'Solutions', {
        configurable: true,
        enumerable: true,
        get: function() {
            return Solutions;
        },
        set: function(fn) { Solutions.orig_constructor = fn; }
    });

    var SymbolabSteps = function(e, b, a) {
        SymbolabSteps.orig_constructor.call(this, e, 'true', a);
    };
    Object.defineProperty(window, 'SymbolabSteps', {
        configurable: true,
        enumerable: true,
        get: function() {
            return SymbolabSteps;
        },
        set: function(fn) { SymbolabSteps.orig_constructor = fn; }
    });

    Object.defineProperty(window, 'subscribed', {
        get: function() {
            return true;
        },
        set: function() {}
    });

    document.onreadystatechange = function () {
        if (document.readyState === 'interactive')
            SOLUTIONS.switchPad(i18n('full pad'));
    };
})();
