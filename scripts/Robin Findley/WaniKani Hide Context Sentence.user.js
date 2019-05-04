// ==UserScript==
// @name        WaniKani Hide Context Sentence
// @namespace   rfindley
// @description Hide context sentences until hovered.
// @version     1.0.3
// @include     https://www.wanikani.com/review/session*
// @include     https://www.wanikani.com/lesson/session*
// @include     https://www.wanikani.com/vocabulary/*
// @include     https://www.wanikani.com/level/*/vocabulary/*
// @copyright   2015+, Robin Findley
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// ==/UserScript==

(function(gobj) {
    var css =
        '.context-sentence-group p:not([lang="ja"]):not(:hover) {'+
        '  background-color:#ccc;'+
        '  color:#ccc;'+
        '  text-shadow:none;'+
        '}';

    // Insert CSS
    $('head').append('<style type="text/css">'+css+'</style>');

}());
