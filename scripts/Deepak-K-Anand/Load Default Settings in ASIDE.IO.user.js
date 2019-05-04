// ==UserScript==
// @name         Load Default Settings in ASIDE.IO
// @version      0.1
// @description  Load pre-defined editor settings for ASIDE.IO(A cloud based Salesforce IDE)
// @author       Deepak
// @match        https://www.aside.io/*
// @grant        none
// @namespace https://greasyfork.org/users/44402
// ==/UserScript==

(function() {
    'use strict';

    jQuery( document ).ready(
        function() {
            jQuery( "#sub-controls").prepend(
                jQuery( "<div/>" )
                .attr( "class", "sub-button" )
                .html( "load defaults" )
                .click(
                    function() {
                        //color scheme used by the code editor
                        localStorage.setItem( "d3vthm", "ace/theme/monokai" );

                        //editor font size in pixels
                        localStorage.setItem( "d3vfts", 18 );

                        //enables the footer at the bottom of the code section
                        localStorage.setItem( "d3vsft", true );

                        //display invisible characters
                        localStorage.setItem( "d3vsiv", true );

                        //display indentation characters
                        localStorage.setItem( "d3vidg", true );

                        //highlights the currently selected line in the editor
                        localStorage.setItem( "d3valh", true );

                        //highlights the currently selected word in the editor
                        localStorage.setItem( "d3vawh", true );

                        //enable multiple cursors
                        localStorage.setItem( "d3vmca", true );

                        //load only unmanaged files in the component list
                        localStorage.setItem( "d3v36000000pFviEAEnfr", "upkg" );

                        location.reload();
                    }
                )
            );
        }
    );
})();