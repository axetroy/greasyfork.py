// ==UserScript==
// @name         謎の予定fix
// @namespace    https://twitter.com/falcon610
// @version      0.1
// @description  一時的なやーつ
// @author       badfalcon
// @match        http://nazo.pics/event/index.php*
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('#frame-contents').on('scroll',function(){
        $('#frame-colhead').scrollLeft($(this).scrollLeft());
        $('#frame-rowhead').scrollTop($(this).scrollTop());
    });

})();