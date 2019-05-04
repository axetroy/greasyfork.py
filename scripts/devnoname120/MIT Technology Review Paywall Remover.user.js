// ==UserScript==
// @name MIT Technology Review Paywall Remover
// @author noname120
// @namespace HandyUserscripts
// @description Remove the paywall on MIT Technology Review
// @version 1
// @license Creative Commons BY-NC-SA

// @include http*://technologyreview.com/
// @include http*://www.technologyreview.com/

// @grant none
// @run-at document-start
// ==/UserScript==

localStorage.removeItem('mittr:meter');