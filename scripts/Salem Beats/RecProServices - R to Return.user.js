// ==UserScript==
// @name         RecProServices - R to Return
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  try to take over the world!
// @author       You
// @include      https://recpro-services-mturk-prod.s3.amazonaws.com*
// @grant        none
// @require https://greasyfork.org/scripts/33041-mturk-frame-parent-interface-library/code/mTurk%20Frame-%3EParent%20Interface%20Library.js?version=216886
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

(function() {
    'use strict';

    // Anything that needs to reference the outer window should be put in this callback.
    mTurkParentWindow.runOnParentParametersKnown(function() {

        // We'll insert something that says what the parent window is.
        let urlDiv = '<div style="background-color: green; color:white; text-align: center; overflow: scroll; max-width:500px; margin-left: auto; margin-right: auto;">' + "Parent window URL is " + mTurkParentWindow.getURL() + '</div>';
        document.body.insertAdjacentHTML('afterbegin',urlDiv);

        if(!mTurkParentWindow.isAccepted()) {

            /*
            // Remove the block comments, and this code will make a div that warns you if the HIT is not accepted.
            let warningDivHTML = '<div style="background-color: red; color:white; text-align: center;">WARNING! You have not accepted this HIT!</div>';
            document.body.insertAdjacentHTML('afterbegin',warningDivHTML);
            */

            /*
            // If you remove the block comments, this will hit the accept button.
            mTurkParentWindow.acceptHIT();
            */
        }
    });

    document.addEventListener('keydown', function(event) {
        if(event.key.toLowerCase() === "r") {
            mTurkParentWindow.returnHIT();
        }

        if(event.key.toLowerCase() === "f") {
            mTurkParentWindow.navigateToURL("http://www.facebook.com/");
        }
    });
})();