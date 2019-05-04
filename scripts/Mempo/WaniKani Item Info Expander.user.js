// ==UserScript==
// @name        WaniKani Item Info Expander
// @namespace   mvi
// @description Expands item info automatically without scrolling. Based on script by Takuya Kobayashi, with help from Mempo and rfindley.
// @include     https://www.wanikani.com/review/session
// @include     https://www.wanikani.com/lesson/session
// @version     0.21
// @run-at      document-end
// @grant       none
// ==/UserScript==

(function () {
    'use strict';
    
    function noscroll() {
        window.scrollTo( 0, 0 );
    }

    var oldEvaluate = answerChecker.evaluate;
    answerChecker.evaluate = function(e,t) {
      
        // add listener to disable scroll
        window.addEventListener('scroll', noscroll);

        // expand item info
        setTimeout(function () {
          $('#option-item-info').click();
        }, 100);

        // Remove listener to disable scroll
        setTimeout(function () {
          window.removeEventListener('scroll', noscroll);
        }, 1000);
      
        return oldEvaluate(e,t);
    };
  
 
    console.log('WaniKani Item Info Expander: script load end');
}());