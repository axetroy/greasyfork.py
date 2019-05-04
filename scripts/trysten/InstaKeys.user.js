// ==UserScript==
// @name         InstaKeys
// @namespace    https://github.com/trysten
// @version      0.1
// @description  control instagram with hjkl
// @author       trysten
// @match        https://*.instagram.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
document.onkeydown = function(evnt)
{
    switch(evnt.key)
    {
        //next item in set
        case 'l':
            document.getElementsByClassName('coreSpriteRightChevron')[0].click();
            break;
        //previous item in set
        case 'h':
            document.getElementsByClassName('coreSpriteLeftChevron')[0].click();
            break;
        //next post
        case 'j':
            document.getElementsByClassName('coreSpriteRightPaginationArrow')[0].click();
            break;
        case 'k':
            document.getElementsByClassName('coreSpriteLeftPaginationArrow')[0].click();
            break;
    }
};
})();