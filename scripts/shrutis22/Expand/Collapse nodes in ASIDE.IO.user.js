// ==UserScript==
// @name         Expand/Collapse nodes in ASIDE.IO
// @version      1.0
// @description  Perform Code Folding in ASIDE.IO (A cloud based Salesforce IDE)
// @author       Shruti Sridharan
// @match        https://www.aside.io/*
// @grant        https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @namespace https://greasyfork.org/users/56475
// ==/UserScript==

(function() {
    'use strict';
    jQuery( document ).ready(
        function() {
            jQuery( "#sub-controls").prepend(
                jQuery( "<div/>" )
                    .attr( "class", "sub-button" )
                    .html( "- collapse" )
                    .click(
                        function() {
                            unsafeWindow.editor.getSession().foldAll();
                        }
                    )
            );
            jQuery( "#sub-controls").prepend(
                jQuery( "<div/>" )
                    .attr( "class", "sub-button" )
                    .html( "+ expand" )
                    .click(
                        function() {
                            unsafeWindow.editor.getSession().unfold();
                        }
                    )
            );
        }
    );
})();