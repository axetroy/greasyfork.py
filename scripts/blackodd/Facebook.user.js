// ==UserScript==
// @name         Facebook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove crap from fb
// @author       BlackOdd
// @include      https://www.facebook.com*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
(function(){  
    'use strict';
    $('#pagelet_sidebar').hide();
    $('.rightColumnWrapper').hide();
})();