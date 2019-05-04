// ==UserScript==
// @name         SF OM Remove Confirmation
// @version      1.1
// @description  Remove the Confirmation Link for the Action Links on the Outbound Message
// @author       Deepak
// @match        https://*.salesforce.com/ui/setup/outbound/WfOutboundStatusUi?setupid=WorkflowOmStatus
// @grant        none
// @namespace https://greasyfork.org/users/44402
// ==/UserScript==

(function() {
    'use strict';

    var actionLinks = document.querySelectorAll( "[class=actionLink]" );
    for( var i = 0; i < actionLinks.length; i++ ) {
        actionLinks[i].removeAttribute( "onclick" );
    }
})();