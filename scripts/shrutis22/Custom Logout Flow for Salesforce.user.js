// ==UserScript==
// @name         Custom Logout Flow for Salesforce
// @version      1.0
// @description  A Custom Logout Flow for Salesforce
// @author       Shruti Sridharan
// @match        https://*.salesforce.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/56475
// ==/UserScript==

(function() {
    'use strict';

    var $actualLink = $( "a[href='/secur/logout.jsp']" );

    var $parent = $actualLink.parent();

    var $newLink = $( "<a/>" ).attr( "href", "/apex/logout" ).html( "Logout from Salesforce" );

    $parent.append( $newLink );

    $actualLink.remove();
})();