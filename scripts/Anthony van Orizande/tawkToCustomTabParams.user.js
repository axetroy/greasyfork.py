// ==UserScript==
// @name         tawkToCustomTabParams
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Insert User Details into the Custom Tab URLS
// @author       Anthony van Orizande
// @match        https://dashboard.tawk.to/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var contactEmail = null;

    // Assume that jQuery is loaded by the Tawk.to client.
    // Activity loop to look for detail changes.
    setInterval(function () {
        try {
            var $detailsForm = $('#details-form table tr');
            if (!$detailsForm) {
                $detailsForm = $('#conversation-details-container table tr');
            }

            // If we have a detail form then capture the details.
            if ($detailsForm && $detailsForm.length) {
                // Save the contact information.
                for(var i = 0; i < $detailsForm.length; i++) {
                    var fieldName = $detailsForm[i].firstChild.innerText.toLowerCase();
                    var fieldValue = $detailsForm[i].lastChild.innerText;
                    switch(fieldName) {
                        case 'email': contactEmail = fieldValue; break;
                    }
                }
            }
            else {
                // Chat Form
                var chatEmail = $('input.visitor-email-input').attr('value');
                if (chatEmail)
                    contactEmail = chatEmail;
            }

            // Update the Custom Tabs if any parameters found.
            var $customIFrames = $(".details-container .custom-view iframe");
            if ($customIFrames && $customIFrames.length) {
                // Assume that a new iFrame will be injected if a new ticket or user is opened.
                for(var j = 0; j < $customIFrames.length; j++) {
                    var $iframe = $customIFrames[j];
                    if (contactEmail && $iframe.src.indexOf("($email$)") > -1)
                        $iframe.src = $iframe.src.replace("($email$)", contactEmail);
                }
            }
        }
        catch(ex)
        {
            console.error('ERROR: ' + (typeof ex == 'string') ? ex : ex.message);
        }
    }, 1000);
})();