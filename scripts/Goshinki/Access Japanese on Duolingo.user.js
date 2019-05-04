// ==UserScript== 
// @name Access Japanese on Duolingo  
// @version 0.1 
// @description To enable Japanese course on Duolingo web obviously. You need to be on the Discussion page to see the Japanese menu entry in your learning menu.
// @author Goshinki 
// @match https://www.duolingo.com/discussion* 
// @grant none 
// @require http://code.jquery.com/jquery-latest.js 
// @namespace https://greasyfork.org/users/143845
// ==/UserScript==

(function() { 
    'use strict';
    $(
        $(document.createElement('li')).attr({
            'class': 'language-choice',
            'data-value': 'ja'
        })).append(
            $(document.createElement('a')).attr('href', 'javascript:;').append(
                $(document.createElement('span')).attr('class', 'flag flag-svg-micro flag-ja'),
                $($(document.createElement('span')).attr('data-value', 'ja')).text('Japanese')
            )
    ).insertBefore(
        $(".language-choice").parent().children('.divider')
    );
})();
