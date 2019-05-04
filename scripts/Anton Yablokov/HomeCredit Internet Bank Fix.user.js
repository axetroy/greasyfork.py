// ==UserScript==
// @name            HomeCredit Internet Bank Fix
// @name:ru         Костыль для сайта HomeCredit
// @description	    fixes login issues
// @description:ru  решает проблемы при входе
// @namespace       https://ib.homecredit.ru/ibs
// @match           https://ib.homecredit.ru/ibs/*
// @copyright       2018, StSav012
// @author          StSav012
// @grant           none
// @version         0.1.20181118.1
// @run-at          document-start
// ==/UserScript==

/* jshint esversion: 6 */
/* jshint browser: true */

"use strict";

// see http://stackoverflow.com/a/14570614
var observeDOM = (function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback) {
        if (MutationObserver) {
            // define a new observer
            var obs = new MutationObserver(function(mutations) {
                if (mutations[0].addedNodes.length || mutations[0].changedNodes.length) {
                    callback();
                }
            });
            // have the observer observe foo for changes in children
            obs.observe(obj, {childList: true, subtree: true});
        }
        else if (eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeChanged', callback, false);
        }
    };
})();

observeDOM(document.head, function() {
  for (let s of document.styleSheets) {
    s.insertRule = function(rule, index) {
      var s = document.createElement('style');
      s.type = 'text/css';
      s.appendChild(document.createTextNode(rule));
      (document.head||document.documentElement).appendChild(s);
    };
  }
});
