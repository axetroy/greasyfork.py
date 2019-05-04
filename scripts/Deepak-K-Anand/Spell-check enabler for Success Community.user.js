// ==UserScript==
// @name         Spell-check enabler for Success Community
// @version      0.1
// @description  Turn on the spell check for the reply box(CKEditor) in the Salesforce Success Community
// @author       Deepak K Anand
// @match        https://success.salesforce.com/*
// @grant        none
// @namespace https://greasyfork.org/users/44402
// ==/UserScript==

(function() {
    'use strict';

    window.setInterval(
        function() {
            var ckEditors = document.getElementsByTagName( "iframe" );

            for( var i = 0; i < ckEditors.length; i++ ) {
                if( ckEditors[i].contentDocument.body ) {
                    ckEditors[i].contentDocument.body.spellcheck = true;
                }
            }
        },
        100
    );
})();